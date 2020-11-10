import { Anchor } from "antd";

export default function LocationComponent(props) {
  const { Link } = Anchor;
  
  console.log(props)
  const input = props.item;
  const area = props.area
  const weather = props.weather

  console.log(props.item)

  return (
    <>
      <div>
        {/* <Link href="" title="">{inputName}</Link> */}
        {input.camera_id} {area} {weather}
      </div>
    </>
  );
}
