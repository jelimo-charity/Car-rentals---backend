import db from "./drizzle/db";

const getBooks = async () => {
    return await db.query.Books.findFirst()
}

async function main() {
    console.log(await getBooks());
  
}
main()