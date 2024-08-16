import { useState } from "react";
import CustomNavbar from "../components/Navbar";
import "../styles/styles.css"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter, ScatterChart } from 'recharts';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import moment from "moment-timezone";
import { getUserChartData } from "../services/pages/userHome/userHomeServices";
function buildListParsedDictionary(dictionary: any) {
    console.log(dictionary)
    let parsedDictionay = []
    for (const key in dictionary) {
        let porcentage = dictionary[key]
        let name = new Date(key).getTime()
        parsedDictionay.push({ name: name, porcentage: porcentage })
    }
    return parsedDictionay
}
function UserHome() {
    const playerId = useSelector<RootState>(state => state.auth.user)
    const [inputBallSpeed, setInputBallSpeed] = useState(0.5)
    const [inputBallNumber, setInputBallNumber] = useState(10)
    const [diagramData, setDiagramData] = useState([])
    const fetching = async () => {
        try {
            let userChartData = null
            if (typeof playerId == "number") {
                userChartData = await getUserChartData(playerId, inputBallSpeed, inputBallNumber)
            }
            if (userChartData != null) {
                let parsedUserChartData = buildListParsedDictionary(userChartData)
                setDiagramData([...parsedUserChartData])
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        await fetching()

    }
    const formatXAxis = (tickItem: Date) => {
        return moment(tickItem).format("YYYY-MM-DD")
    }
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`day : ${moment(new Date(payload[0].value)).format("YYYY-MM-DD")}`}</p>
                    <p className="label">{`porcentage : ${payload[1].value}`}</p>
                </div>
            );
        }

        return null;
    };
    return (<>
        <CustomNavbar />
        <div className="userHomeWrapper">
            <div className="buttonWrapper">
                <form onSubmit={handleSubmit} className="formUserHome">
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
                    <ScatterChart
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
                        <YAxis dataKey='porcentage' name="Porcentage" type="number" domain={[0, 100]} />
                        <XAxis
                            dataKey="name"
                            domain={['auto', 'auto']}
                            tickFormatter={formatXAxis}
                            type="number"
                        />
                        <Tooltip content={<CustomTooltip />} />

                        <Legend />
                        <Scatter
                            data={diagramData}
                            line={{ stroke: '#eee' }}
                            lineJointType='monotoneX'
                            lineType='joint'
                            name='porcentage'
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    </>)
}
const graphWrapperStyle = {
    width: "600px",
    height: "600px",
    // backgroundColor: "red",
}

export default UserHome;
