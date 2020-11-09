import { List, Divider, Anchor } from 'antd';
import LocationComponent from '../LocationComponent'

export default function LocationListComponent() {
    const handleClick = (e, link) => {
        e.preventDefault();
        console.log(link);
      };

    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ];
    
    return (
        <>
        <Divider></Divider>
        <Divider orientation="center">List of Locations</Divider>
        <Anchor affix={false} onClick={handleClick}>
            <List
                size="large"
                bordered
                dataSource={data}
                renderItem={item => 
                <List.Item>
                    <LocationComponent location={item}/>
                </List.Item>}
            />
        </Anchor>
            
        </>
    ) 
}