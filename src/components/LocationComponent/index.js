import { Anchor } from "antd";

export default function LocationComponent({ location }) {
  const { Link } = Anchor;

  const locationName = location;

  return (
    <>
      <Link href="" title="Press Me"></Link>
      <div>
        <body>
          Latitude = {locationName.latitude}
          Longitude = {locationName.longitude}
        </body>
      </div>
    </>
  );
}
