import styled from "styled-components";

const ShopDetailInfoDiv = styled.div`
  padding: 30px;
  min-height: 200px;

  & > table {
    margin-left: auto;
    margin-right: 0;

    @media (max-width: 992px) {
      margin: auto;
    }
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

const ShopDetailInfo = ({ data }) => {
  return (
    <ShopDetailInfoDiv>
      <table>
        <tbody>
          <tr>
            <th>주소</th>
            <td>{data.location}</td>
          </tr>
          <tr>
            <th>음식 종류</th>
            <td>{data.genus}</td>
          </tr>
          <tr>
            <th>영업 시간</th>
            <td>{data.work_time}</td>
          </tr>
          <tr>
            <th>메뉴</th>
            <td>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {data.menus.map((item, idx) => {
                  return (
                    <li key={idx}>
                      {item.menu_name === "메뉴 없음"
                        ? "등록된 메뉴 정보가 없습니다."
                        : item.price === "가격 정보 없음"
                        ? `${item.menu_name}`
                        : `${item.menu_name} : ${item.price}원`}
                    </li>
                  );
                })}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </ShopDetailInfoDiv>
  );
};

export default ShopDetailInfo;
