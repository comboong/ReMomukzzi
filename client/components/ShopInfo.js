import styled from "styled-components";

const ShopInfoDiv = styled.div`
  padding: 30px;
  min-height: 200px;
  min-width: 470px;

  & > table {
    margin: auto;
  }

  & > table > tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  & > table > tbody > tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  & > table > tbody > tr > th {
    width: 110px;
    font-size: 1rem;
    color: rgba(79, 79, 79, 0.6);
    line-height: 1.7;
    text-align: left;
    vertical-align: top;
    padding-right: 10px;
    padding-bottom: 5px;
  }

  & > table > tbody > tr > td {
    font-size: 1rem;
    color: #4f4f4f;
    line-height: 1.7;
    text-align: left;
    vertical-align: middle;
    padding-bottom: 5px;
  }
`;

const ShopInfo = ({ shopInfo }) => {
  return (
    <ShopInfoDiv>
      <table>
        <tbody>
          <tr>
            <th>주소</th>
            <td>{shopInfo.shopInfo.road_address_name}</td>
          </tr>
          <tr>
            <th>음식 종류</th>
            <td>{shopInfo.shopInfo.category_name.split(">")[1]}</td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td>
              {!shopInfo.shopInfo.phone ? "정보 없음" : shopInfo.shopInfo.phone}
            </td>
          </tr>
          <tr>
            <th>메뉴</th>
            <td>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {shopInfo.shopMenus.slice(0, 8).map((item, idx) => {
                  return (
                    <li key={idx}>
                      {item[0]} : {item[1]}
                      {item[1] !== "가격 정보 없음" ? "원" : ""}
                    </li>
                  );
                })}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </ShopInfoDiv>
  );
};

export default ShopInfo;
