import { Injectable } from '@angular/core';
import {IProductRequest} from '../../interfaces/interfaces';
import {
  Firestore, CollectionReference, addDoc, collectionData,
  doc, updateDoc, deleteDoc, docData, query, where, getDocs
} from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.productCollection = collection(this.afs, 'products');
  }

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' })
  }

  // getAllByCategory(name: string): Observable<IProductResponse[]> {
  //   return this.http.get<IProductResponse[]>(`${this.api.products}?category.path=${name}`);
  // }

  async getAllByCategory(name: string) {
    const arr: DocumentData[] = [];
    const category = query(
      collection(this.afs, 'products'), where('category.path', '==', `${name}`));
    const querySnapshot = await getDocs(category);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return arr;
  }

  getOneFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return docData(productDocumentReference, { idField: 'id' });
  }

  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateFirebase(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, {...product});
  }

  deleteFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }

}
