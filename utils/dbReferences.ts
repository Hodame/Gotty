import { Firestore, collection } from "firebase/firestore"
import { Review } from "~/global"

export const gamesReviewsCollection = (db: Firestore) => (collection(db, 'games_reviews')).withConverter(converter<Review>())
