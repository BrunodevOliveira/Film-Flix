import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, user } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { from, map, of, switchMap, tap } from 'rxjs';

import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private db: Firestore) { }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password))
    //from cria um observable a partir de uma fonte de dados
  }

  signup(email: string, password: string, payload: User) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap((creds) => {
      payload.uid = creds.user.uid

      const users = collection(this.db, 'users')
      const userDoc = doc(users, payload.uid)

      setDoc(userDoc, payload)
    }))
  }

  //Verifica se o usuário está logado no sistema
  get user() {
    //Esse user retorna quando o usuário está logado ou deslogado.
      //O switchMap() é um operador de transformação do RxJS! Ele permite que vc trate o resultado (valor emitido) de um Observable ( vamos chamar esse cara de obs1 pra facilitar o entendimento ) e te obriga a retornar um novo Observable ( o obs2 ).
    return user(this.auth).pipe(switchMap(
        //Se estiver logado cai no if que chama o método getUserData
      (user) => {
        if(user){
          return this.getUserData(user.uid)
        }
        return of(undefined) //cria um observable de undefined
      }
    ))
  }

  private getUserData(uid: string) {
    const users = collection(this.db, 'users')
    const userDoc = doc(users, uid)

    return docData(userDoc).pipe(map((data) => data as User))
  }
}
