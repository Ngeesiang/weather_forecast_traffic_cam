import { Anchor } from 'antd';


export default function LocationComponent({location}) {

    const { Link } = Anchor;

    return (
        <>
        {/* <Link href="" title={location}>
        </Link> */}
        <div>
            {location}
        </div>
        </>
    )
}


