import { Firestore, collection, getDoc, doc, query, where } from "firebase/firestore"
import { Review } from "~/global"
export const gamesReviewsCollection = (db: Firestore, gameId: string) => (query(collection(db, "cities", gameId, 'reviews'), where("text_review", "!=", ''))).withConverter(converter<Review>())
// export const userReviewRef = (db: Firestore, gameId: string,,) => (getDoc(doc(db, 'profiles', user.value.uid, 'reviews', gameId)))