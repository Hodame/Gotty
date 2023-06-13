import { Firestore, collection, getDoc, doc, query, where } from "firebase/firestore"
import { Review } from "~/global"
export const gamesReviewsCollection = (db: Firestore, gameId: string) => (query(collection(db, "games", gameId, 'reviews'), where("text_review", "!=", ''))).withConverter(converter<Review>())
export const userCollection = (db: Firestore, user: string, userCollection: string) => (query(collection(db, "profiles", user, 'games_reviews'), where("collection", "==", userCollection))).withConverter(converter<Review>())
// export const userReviewRef = (db: Firestore, gameId: string,,) => (getDoc(doc(db, 'profiles', user.value.uid, 'reviews', gameId)))