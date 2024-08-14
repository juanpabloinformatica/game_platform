import { useEffect, useState } from "react";
import CustomNavbar from "../components/Navbar";
import "../styles/styles.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter } from 'recharts';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { axiosGameCLient } from "../axios/axiosClients";
import moment from "moment-timezone";

//Perfect so now, what we

const data = [
    {
        name: 'Page A',
        // uv: 4000,
        // pv: 2400,
        // amt: 2400,
    },
    {
        name: 'Page B',
        // uv: 3000,
        // pv: 1398,
        // amt: 2210,
    },
    {
        name: 'Page C',
        // uv: 2000,
        // pv: 9800,
        // amt: 2290,
    },
    {
        name: 'Page D',
        // uv: 2780,
        // pv: 3908,
        // amt: 2000,
    },
    {
        name: 'Page E',
        // uv: 1890,
        // pv: 4800,
        // amt: 2181,
    },
    {
        name: 'Page F',
        // uv: 2390,
        // pv: 3800,
        // amt: 2500,
    },
    {
        name: 'Page G',
        // uv: 3490,
        // pv: 4300,
        // amt: 2100,
    },
];
// const data = [
//
//     {
//         name: `2024-08-09`
//     },
//     {
//
//     },
// ]

function buildListParsedDictionary(dictionary: any) {
    console.log("here")
    console.log(dictionary)
    let parsedDictionay = []
    for (const key in dictionary) {
        console.log('heloo')
        console.log(moment(key.toLocaleString()).format("YYYY-MM-DD"))
        let porcentage = dictionary[key]
        let name = moment(key.toLocaleString()).format("YYYY-MM-DD")
        parsedDictionay.push({ name: name, porcentage: porcentage })
        // console.log(`${key}: ${dictionary[key]}`);
    }
    // console.log(parsedDictionay)
    return parsedDictionay
}
function UserHome() {
    const playerId = useSelector<RootState>(state => state.auth.user)
    const [inputBallSpeed, setInputBallSpeed] = useState(0.5)
    const [inputBallNumber, setInputBallNumber] = useState(10)
    const [diagramData, setDiagramData] = useState([])

    const fetching = async () => {
        try {
            const response = await axiosGameCLient.get(`/userchart?playerId=${playerId}&ballSpeed=${inputBallSpeed}&ballNumber=${inputBallNumber}`)
            if (response) {
                let data = response.data
                let parsedDictionary = buildListParsedDictionary(data)
                console.log(parsedDictionary)
                setDiagramData([...parsedDictionary])

            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetching()

    }
    const formatXAxis = (tickItem) => {
        // console.log(moment(tickItem).format("YYYY-MM-DD")
        return moment(tickItem).format("YYYY-MM-DD")
    }
    return (<>
        <CustomNavbar />
        <div className="userHomeWrapper">
            hola tu pronto pondre tu nombre
            <div className="buttonWrapper">
                <form onSubmit={handleSubmit} className="form">
                    <label>BallSpeed</label>
                    <input
                        type="number" step="0.1" min="0"
                        value={inputBallSpeed}
                        onChange={(e) => setInputBallSpeed(parseInt(e.target.value))}

                    />
                    <label>BallNumber</label>
                    <input
                        type="number" step="1"
                        value={inputBallNumber}
                        onChange={(e) => setInputBallNumber(parseInt(e.target.value))}
                    />
                    <button type="submit">
                        submit
                    </button>
                </form>
            </div>
            <div style={graphWrapperStyle}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={diagramData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" type="number" domain={['2024-08-09', '2024-08-13']} tickFormatter={formatXAxis} />
                        <YAxis type="number" domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        // <Line type="monotone" dataKey="porcentage" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Scatter data={diagramData} line={{ stroke: 'red', strokeWidth: 2 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </>)
}
const graphWrapperStyle = {
    width: "700px",
    height: "700px",
    // backgroundColor: "red",
}
export default UserHome;
