import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, IconButton } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import LeftBar from '../General/LeftBar';
import ProductGrid from '../General/Product/ProductGrid';
import {
  fetchData, ProductsResponse,
} from '../../api';
import { selectProducts } from '../../redux/selectors';
import { extractParamFromQuery } from '../../common/utils';

function HomePage() {
  const allProducts = useSelector(selectProducts);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductsResponse>(allProducts);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageQuery = useLocation().search;
  const navigate = useNavigate();

  const showBack = currentPage !== 1;
  const showNext = currentPage < products.numberOfPages;

  const constructNewQuery = (goNext: boolean) => {
    const params = new URLSearchParams(pageQuery);
    const currentPage = extractParamFromQuery('page', pageQuery) ?? '0';
    let toGo = Number(currentPage);
    if (goNext) {
      toGo += 1;
    } else {
      toGo -= 1;
    }
    params.set('page', toGo.toString());
    return params.toString();
  };

  const goBack = () => navigate(`/?${constructNewQuery(false)}`);
  const goNext = () => navigate(`/?${constructNewQuery(true)}`);

  useEffect(() => {
    const fetchFilteredProducts = async (query: string) => {
      try {
        const filteredProducts = await fetchData<ProductsResponse>(`/product${query}`);
        setProducts(filteredProducts);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to filter products');
      } finally {
        setIsLoading(false);
      }
    };

    if (!pageQuery) { setIsLoading(false); setProducts(allProducts); } else { fetchFilteredProducts(pageQuery); }
  }, [allProducts, pageQuery]);

  useEffect(() => {
    const currentPage = extractParamFromQuery('page', pageQuery);
    if (currentPage) {
      setCurrentPage(Number(currentPage) + 1);
    } else {
      setCurrentPage(1);
    }
  }, [pageQuery]);

  return (
    <div className="layout">
      { !isMobile && <LeftBar isLoading={isLoading} initialPriceRange={products.priceRange} /> }
      <Flex direction="column">
        <ProductGrid isLoading={isLoading} products={products.products} />
        <Flex align="center" mb="3" gap="5" style={{ alignSelf: 'center' }}>
          {showBack
            && (
              <IconButton onClick={goBack} color="purple">
                <ChevronLeftIcon />
              </IconButton>
            )}
          {(showBack || showNext)
             && currentPage}
          {showNext
            && (
              <IconButton onClick={goNext} color="purple">
                <ChevronRightIcon />
              </IconButton>
            )}
        </Flex>
      </Flex>
    </div>
  );
}

export default HomePage;
