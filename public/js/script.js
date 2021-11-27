const cud = localStorage.getItem("asdf");

console.log(`${cud} aiaiuuaaua`);
if (!cud) {
    window.setTimeout(() => {
        location.assign(`/emailVerification`);
    }, 500);
    s++;
}