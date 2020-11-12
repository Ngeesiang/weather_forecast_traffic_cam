import { Card, Image, Row } from "antd";

const { Meta } = Card;

export default function ImageComponent(props) {
  const input = props.item;
  const title = input.location + " - " + input.weather;
  const description = input.timestamp;
  let width = Math.min(props.width, 600) - 40;

  return (
    <Row justify="space-around" align="center">
      <Card
        align="center"
        justify="space-around"
        className="ImageComponent-Card"
        hoverable
        style={{ width: { width } }}
        loading={true}
        cover={<Image width={width} alt="image" src={input.image} />}
      >
        <Meta title={title} description={description} />
      </Card>
    </Row>
  );
}
