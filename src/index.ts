/* firebaseをinitializeする */
import { FirebaseInitializer } from "./lib/firebase/firebase"
const firebaseInitializer = new FirebaseInitializer()
firebaseInitializer.initialize()

/* それぞれのページごとの内容を作成する */
import { PageUtils } from "./utils/domUtils"
const pageCreator = new PageUtils
pageCreator.setPageType()
pageCreator.createContentByPageType()