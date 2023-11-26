export const dynamic = "force-dynamic"; // defaults to force-static
import mongoose from "mongoose";
import Game from "../../schema/game";
export async function GET(request) {
  let query;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
    });
    let isConnected = db.connections[0].readyState === 1;
    console.log(isConnected);
  } catch (e) {
    console.log(e);
  }

  //   if (request.nextUrl.searchParams.get("area")) {
  //     let area = JSON.parse(request.nextUrl.searchParams.get("area")).map((x) =>
  //       parseFloat(x)
  //     );

  //     let box = [
  //       [area[2], area[0]],
  //       [area[3], area[0]],
  //       [area[3], area[1]],
  //       [area[2], area[1]],
  //       [area[2], area[0]],
  //     ];

  //     //   let box = [
  //     //     [-115.8953504, 35.0018894],
  //     //     [-114.0462856, 35.0018894],
  //     //     [-114.0462856, 36.854092],
  //     //     [-115.8953504, 36.3808406],
  //     //     [-115.8953504, 35.0018894],
  //     //   ];

  //     query = {
  //       location: {
  //         $geoWithin: {
  //           $geometry: {
  //             type: "Polygon",
  //             coordinates: [box],
  //           },
  //         },
  //       },
  //     };
  //   } else {
  let coordinates = [
    parseFloat(request.nextUrl.searchParams.get("lng")),
    parseFloat(request.nextUrl.searchParams.get("lat")),
  ];
  let maxDistance =
    parseFloat(request.nextUrl.searchParams.get("distance")) || 5000;
  query = {
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates,
        },
        $maxDistance: maxDistance,
      },
    },
  };
  //   }
  console.log(JSON.stringify(query));
  let games = await Game.find(query);
  return Response.json({ games });
}
// {"location":{$nearSphere:{$geometry:{"type":"Point","coordinates":[-115.148516,36.1672559]},$maxDistance:1000}}}
