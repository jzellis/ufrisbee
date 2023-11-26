// `app/page.js` is the UI for the `/` URL
export const metadata = {
  title: "Frisbee Game Finder",
};

const getGames = async () => {};
export default async function Page() {
  await getGames();
  return <>Yo yo</>;
}
