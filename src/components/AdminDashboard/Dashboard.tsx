import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, DataList, Flex } from '@radix-ui/themes';
import { BarChart, PieChart } from '@mui/x-charts';
import { isUserAdmin, roundToNearestTwoPlaces } from '../../common/utils';
import { selectUser } from '../../redux/selectors';
import AuthContext from '../../hooks/AuthContext';
import {
  CartStatistics,
  fetchData,
  ProductStatistics,
  Statistics,
  UserStatistics,
} from '../../api';

const fetchStatistic = async <T extends Statistics>(
  entity: string,
  token: string,
  setStatistic: Dispatch<SetStateAction<T | undefined>>,
) => {
  try {
    const statistic = await fetchData<T>(`/admin/${entity}`, undefined, token);
    setStatistic(statistic);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching statistic - ${entity}`);
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { authResponse } = useContext(AuthContext);
  const [userStatistics, setUserStatistics] = useState<
    UserStatistics | undefined
  >();
  const [productStatistics, setProductStatistics] = useState<
    ProductStatistics | undefined
  >();
  const [cartStatistics, setCartStatistics] = useState<
    CartStatistics | undefined
  >();

  useEffect(() => {
    if (!isUserAdmin(user) || !authResponse) {
      navigate('/');
    }
  }, [authResponse, user]);

  useEffect(() => {
    const token = authResponse?.token;
    if (token) {
      fetchStatistic<UserStatistics>('user', token, setUserStatistics);
      fetchStatistic<ProductStatistics>('product', token, setProductStatistics);
      fetchStatistic<CartStatistics>('cart', token, setCartStatistics);
    }
  }, [authResponse]);

  return (
    <Flex pl="6" pr="6" pt="4" justify="between">
      <Box>
        <h3 style={{ fontFamily: 'Montserrat' }}>Users</h3>
        <h4 style={{ fontFamily: 'Montserrat' }}>Pie chart</h4>
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: userStatistics?.adminCount ?? 0,
                  label: 'Admin',
                  color: 'blue',
                },
                {
                  id: 1,
                  value: userStatistics?.merchandiserCount ?? 0,
                  label: 'Merchandiser',
                  color: 'teal',
                },
                {
                  id: 2,
                  value: userStatistics?.regularUserCount ?? 0,
                  label: 'Regular',
                  color: 'purple',
                },
              ],
            },
          ]}
          width={600}
          height={300}
        />
        <h4 style={{ fontFamily: 'Montserrat' }}>Table</h4>
        <DataList.Root size="3">
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Total</DataList.Label>
            <DataList.Value>{userStatistics?.totalCount}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Admin</DataList.Label>
            <DataList.Value>{userStatistics?.adminCount}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Merchandiser</DataList.Label>
            <DataList.Value>{userStatistics?.merchandiserCount}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Regular</DataList.Label>
            <DataList.Value>{userStatistics?.regularUserCount}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Box>
      <Box>
        <h3 style={{ fontFamily: 'Montserrat' }}>Carts</h3>
        <h4 style={{ fontFamily: 'Montserrat' }}>Pie chart (count)</h4>
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: cartStatistics?.paidCount ?? 0,
                  label: 'Paid',
                  color: 'green',
                },
                {
                  id: 1,
                  value: cartStatistics?.unPaidCount ?? 0,
                  label: 'Unpaid',
                  color: 'red',
                },
              ],
            },
          ]}
          width={450}
          height={300}
        />
        <h4 style={{ fontFamily: 'Montserrat' }}>Bar chart (value)</h4>
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['Cart values'] }]}
          series={[
            {
              data: [cartStatistics?.paidPrice ?? 0],
              label: 'Paid Value',
              color: 'green',
            },
            {
              data: [cartStatistics?.unPaidPrice ?? 0],
              label: 'Unpaid Value',
              color: 'red',
            },
          ]}
          width={450}
          height={300}
          borderRadius={10}
        />
      </Box>
      <Box>
        <h3 style={{ fontFamily: 'Montserrat' }}>Products</h3>
        <h4 style={{ fontFamily: 'Montserrat' }}>Table</h4>
        <DataList.Root size="3">
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Total Count</DataList.Label>
            <DataList.Value>{productStatistics?.totalCount}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Total Price</DataList.Label>
            <DataList.Value>{productStatistics?.totalPrice}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Average Price</DataList.Label>
            <DataList.Value>
              {roundToNearestTwoPlaces((productStatistics?.totalCount ?? 0) === 0
                ? 0
                : (productStatistics?.totalPrice ?? 0)
                  / (productStatistics?.totalCount ?? 1))}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Box>
    </Flex>
  );
}

export default Dashboard;
