const header = {
    "Content-Type":"application/json",
    "Accept":"application/json",
    "Authorization":`Bearer ${localStorage.dbUser ? JSON.parse(localStorage.dbUser).access_token : null}`,
}
export default header;