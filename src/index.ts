/* firebaseをinitializeする */
import { FirebaseInitializer } from "./lib/firebase/firebase"
const firebaseInitializer = new FirebaseInitializer()
firebaseInitializer.initialize()

/* ユーザーの認証状態に合わせて正しいページにリダイレクトする */
import { AppUser } from "./utils/api"
import { indexPageUrl, loginPageUrl } from "./utils/constants"
const appUser = new AppUser()
appUser.redirect(indexPageUrl, loginPageUrl)

/* それぞれのページごとの内容を作成する */
import { PageUtils } from "./utils/domUtils"
const pageCreator = new PageUtils
pageCreator.setPageType()
pageCreator.createContentByPageType()