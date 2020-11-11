import { Card, Image } from "antd";

const { Meta } = Card;

export default function ImageComponent(props) {
  const input = props.item;

  console.log(input);

  const content = (
    <div>
      <p>Click to enlarge</p>
    </div>
  );

  return (
    <>
      <Card
        class="ImageComponent-Card"
        hoverable
        style={{ width: 480 }}
        cover={<Image width={480} alt="image" src={input.image} />}
      >
        <Meta title={input.location} description={input.weather} />
      </Card>
    </>
  );
}
