"use client";
import { useState } from "react";
import Turnstone from "turnstone";
// `app/page.js` is the UI for the `/` URL

export default function Page() {
  const [query, setQuery] = useState(""),
    [results, setResults] = useState([]),
    [distance, setDistance] = useState(10),
    [isSent, setIsSent] = useState(false);

  let distanceArray = [5, 10, 25, 50, 100];

  const searchSelected = async (selectedItem, displayName) => {
    if (isSent === false) {
      console.log(selectedItem);
      if (selectedItem) {
        let gameList = await (
          await fetch(
            `/api?lat=${selectedItem.lat}&lng=${selectedItem.lon}&distance=${
              distance * 1609.344
            }`
          )
        ).json();
        setResults(gameList.games);
        setIsSent(true);
      }
    }
  };

  const listbox = {
    displayField: "display_name",
    searchType: "contains",
    minQueryLength: 3,
    data: async (query) => {
      //   let data = await (
      //     await fetch(`https://geocode.maps.co/search?q=${query}`)
      //   ).json();
      //       return data.map((d) => { { name: d.display_name, shape: d.boundingbox } });

      return await (
        await fetch(`https://geocode.maps.co/search?q=${query}`)
      ).json();
    },
  };

  const getGames = async (e) => {
    e.preventDefault();
    setResults(
      await (await fetch(`https://geocode.maps.co/search?q=${query}`)).json()
    );
  };

  const styles = {
    input:
      "w-full h-12 border border-slate-300 py-2 pl-10 pr-7 text-xl outline-none rounded",
    inputFocus:
      "w-full h-12 border-x-0 border-t-0 border-b border-blue-300 py-2 pl-10 pr-7 text-xl outline-none sm:rounded sm:border",
    query: "text-slate-800 placeholder-slate-400",
    typeahead: "text-blue-300 border-white",
    cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-blue-400 inline-flex sm:hidden`,
    clearButton:
      "absolute inset-y-0 right-0 w-8 inline-flex items-center justify-center text-slate-400 hover:text-rose-400",
    listbox:
      "w-full bg-white sm:border sm:border-blue-300 sm:rounded text-left sm:mt-2 p-2 sm:drop-shadow-xl",
    groupHeading:
      "cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-rose-300",
    item: "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-slate-700",
    highlightedItem:
      "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-slate-700 rounded bg-blue-50",
  };

  return (
    <>
      <div className="flex gap-4">
        <div>
          <Turnstone
            cancelButton={true}
            clearButton={true}
            debounceWait={250}
            id="search"
            listbox={listbox}
            listboxIsImmutable={true}
            matchText={true}
            maxItems={10}
            name="search"
            noItemsMessage="We found no places that match your search"
            placeholder="Enter a city or airport"
            styles={styles}
            typeahead={true}
            onSelect={searchSelected}
          />
          {results && (
            <ul>
              {results.map((game) => (
                <li key={game._id}>{game.description}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          Distance:{" "}
          <select
            className="select select-bordered"
            onChange={(e) => {
              setDistance(e.target.value);
              searchSelected();
            }}
            defaultValue={distance}
          >
            {distanceArray.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
