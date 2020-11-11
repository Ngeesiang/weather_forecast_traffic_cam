import { Card, Image } from "antd";

const { Meta } = Card;

export default function ImageComponent(props) {
  const input = props.item;
  const title = input.location + "  (" + input.timestamp + ")"

  return (
    <>
      <Card
        class="ImageComponent-Card"
        hoverable
        style={{ width: 600 }}
        cover={<Image width={600} alt="image" src={input.image} />}
      >
        <Meta title={title} description={input.weather} />
      </Card>
    </>
  );
}
