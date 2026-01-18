import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 1000px;
    background-color:rgb(224, 224, 224);
`

export const WrappedNavi = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center:
    align-items: center;
    width: 250px;
    height: 100vh;
    background-color: #404040;
    position: fixed;
    margin: 10px 0px 0px ;
    border-radius:0 10px 0 0;
`
export const Head = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    margin: 20px 0 20px 20px;
    gap: 20px;
`

export const ButtonNavi = styled.div`
    // width: 100%;
    padding: 10px 0 10px 15px ;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    cursor: pointer;
    font-weight: 500;
    color: #fff;
    &:hover {
        background-color: rgb(224, 224, 224);
        color: #404040;
    }
`

export const WrappedMange = styled.div`
    width: 100%;
    background-color: #f5f5f5;
    height: auto;
    margin: 10px 10px 10px 265px;
    border-radius: 10px;
    padding: 10px;
`

export const DashboardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(130deg, #2a2a2a 0%, #4b4b4b 100%);
    color: #ffffff;
    border-radius: 12px;
    padding: 18px 20px;
    margin: 6px 0 16px;
`

export const HeaderTitle = styled.div`
    font-size: 22px;
    font-weight: 700;
`

export const HeaderSub = styled.div`
    font-size: 14px;
    color: #d8d8d8;
    margin-top: 6px;
`

export const HeaderBadge = styled.div`
    background: #f6ac00;
    color: #1f1f1f;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12px;
`

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin: 6px 0 18px;
    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, minmax(180px, 1fr));
    }
    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`

export const StatCard = styled.div`
    background: linear-gradient(160deg, #ffffff 0%, #f3f5f7 100%);
    border-radius: 12px;
    padding: 16px 18px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    border-left: 4px solid #f6ac00;
`

export const StatLabel = styled.div`
    font-size: 14px;
    color: #6b6b6b;
    margin-bottom: 8px;
`

export const StatValue = styled.div`
    font-size: 26px;
    font-weight: 700;
    color: #1f1f1f;
`

export const PanelsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(280px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
    @media (max-width: 980px) {
        grid-template-columns: 1fr;
    }
`

export const PanelCard = styled.div`
    background: #ffffff;
    border-radius: 12px;
    padding: 16px 18px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
`

export const PanelTitle = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: #2a2a2a;
    margin-bottom: 12px;
`

export const StatList = styled.div`
    display: grid;
    gap: 10px;
`

export const StatRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #3a3a3a;
`

export const StatBadge = styled.span`
    background: #f0f0f0;
    color: #2a2a2a;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 999px;
`
