/* データベース関連 */
export const dbUrl:string="https://myschedule-c0a49-default-rtdb.firebaseio.com"

/* ページ関連 */
export const IndexPageUrl:string="./index.html"
export const LoginPageUrl:string="./index.html?page=login"
export const RegisterPageUrl:string="./index.html?page=register"

/* DOM関連 */
export const rootDiv:HTMLDivElement = document.getElementById("root") as HTMLDivElement
if (!rootDiv) {
    throw new Error("root element not found");
}