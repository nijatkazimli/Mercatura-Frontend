import {
  AlertDialog,
  Box, Button, Flex, Select, Tabs, Text,
} from '@radix-ui/themes';
import React, { useContext, useEffect, useState } from 'react';
import './Merchandising.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlusCircledIcon, TrashIcon, UploadIcon } from '@radix-ui/react-icons';
import {
  AddProduct, deleteData, IdResponse, postData, postImages,
} from '../../api';
import { selectCategories, selectProducts, selectUser } from '../../redux/selectors';
import { getNameById, isUserAbleToMerchandise } from '../../common/utils';
import FileUploadPopup from '../General/FileUploadPopup/FileUploadPopup';
import AuthContext from '../../hooks/AuthContext';
import { getCategories, getProducts } from '../../redux/actions';

function Merchandising() {
  const categories = useSelector(selectCategories).slice(1);
  const { products } = useSelector(selectProducts);
  const { authResponse } = useContext(AuthContext);
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newProductDetails, setNewProductDetails] = useState<AddProduct>(
    {
      name: '',
      description: '',
      price: undefined,
      categoryId: '',
    } as unknown as AddProduct,
  );
  const [productNameForPhoto, setProductNameForPhoto] = useState('');
  const [productNameForDeletion, setProductNameForDeletion] = useState('');

  useEffect(() => {
    if (!isUserAbleToMerchandise(user)) {
      navigate('/');
    }
  }, [user]);

  const onProductAdd = async () => {
    if (authResponse?.token) {
      const body = {
        name: newProductDetails.name,
        description: newProductDetails.description,
        price: newProductDetails.price,
      };
      await postData<IdResponse>(
        `/product?categoryId=${newProductDetails.categoryId}`,
        body,
        undefined,
        authResponse.token,
      );
      dispatch(getProducts());
      navigate('/');
    }
  };

  const onUploadPhotos = async (files: Array<File>) => {
    if (authResponse?.token) {
      const id = products.find((product) => product.name === productNameForPhoto)?.id;
      if (id) {
        await postImages(`/product/${id}/image`, files, authResponse.token);
        await new Promise((resolve) => { setTimeout(resolve, 1000); });
        dispatch(getProducts());
        navigate(`/product/${id}`);
      }
    }
  };

  const onDeleteProduct = async () => {
    if (authResponse?.token) {
      const id = products.find((product) => product.name === productNameForDeletion)?.id;
      if (id) {
        await deleteData(`/product/${id}`, undefined, undefined, authResponse.token);
        dispatch(getProducts());
        navigate('/');
      }
    }
  };

  const onCategoryAdd = async () => {
    if (authResponse?.token) {
      await postData<IdResponse>('/category', {
        name: newCategoryName,
      }, undefined, authResponse.token);
      dispatch(getCategories());
      navigate('/');
    }
  };

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
    setNewCategoryName('');
    setNewProductDetails({} as AddProduct);
    setProductNameForPhoto('');
  };

  const setNewProductName = (name: string) => {
    setNewProductDetails((prevDetails) => ({
      ...prevDetails,
      name,
    }));
  };

  const setNewProductPrice = (price: string) => {
    const priceNum = Number(price);
    setNewProductDetails((prevDetails) => ({
      ...prevDetails,
      price: priceNum,
    }));
  };

  const setNewProductDescription = (description: string) => {
    setNewProductDetails((prevDetails) => ({
      ...prevDetails,
      description,
    }));
  };

  const setNewProductCategory = (newCategory: string) => {
    const id = categories.find((category) => category.name === newCategory)?.id;
    if (id) {
      setNewProductDetails((prevDetails) => ({
        ...prevDetails,
        categoryId: id,
      }));
    }
  };

  return (
    <form>
      <Tabs.Root defaultValue="product">
        <Tabs.List>
          <Tabs.Trigger value="product" onClick={() => handlePageChange(0)}>
            Add product
          </Tabs.Trigger>
          <Tabs.Trigger value="photo" onClick={() => handlePageChange(1)}>
            Add photos for the product
          </Tabs.Trigger>
          <Tabs.Trigger value="category" onClick={() => handlePageChange(2)}>
            Add category
          </Tabs.Trigger>
          <Tabs.Trigger value="delete_product" onClick={() => handlePageChange(3)}>
            Delete product
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>

      {page === 0 && (
        <Flex mb="15px" direction="column" maxWidth="400px" p="6" gap="2">
          <Box>
            <Text as="label">Name</Text>
            <input
              id="productName"
              type="text"
              value={newProductDetails.name}
              onChange={(e) => {
                setNewProductName(e.target.value);
              }}
              required
              placeholder="Enter the name"
              className="mercahdising-input"
            />
          </Box>
          <Box>
            <Text as="label">Description</Text>
            <input
              id="description"
              type="text"
              value={newProductDetails.description ?? ''}
              onChange={(e) => {
                setNewProductDescription(e.target.value);
              }}
              placeholder="Enter the description"
              className="mercahdising-input"
            />
          </Box>
          <Box>
            <Text as="label">Price</Text>
            <input
              id="price"
              type="number"
              step="0.01"
              value={newProductDetails.price}
              onChange={(e) => {
                setNewProductPrice(e.target.value);
              }}
              required
              placeholder="Enter the price"
              className="mercahdising-input"
            />
          </Box>
          <Flex direction="row" align="center" justify="between">
            <Text as="label">Category:</Text>
            <Select.Root
              value={getNameById(
                categories,
                newProductDetails.categoryId,
              )}
              onValueChange={setNewProductCategory}
              size="3"
            >
              <Select.Trigger
                placeholder="Select Category"
                radius="none"
                className="dropdown-trigger"
                style={{ fontFamily: 'Montserrat' }}
              />
              <Select.Content color="purple">
                <Select.Group>
                  {categories.map((value) => (
                    <React.Fragment key={value.id}>
                      <Select.Item value={value.name}>{value.name}</Select.Item>
                    </React.Fragment>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>
          <Button type="submit" color="purple" size="3" style={{ fontFamily: 'Montserrat' }} onClick={onProductAdd}>
            <PlusCircledIcon />
            Add
          </Button>
        </Flex>
      )}
      {page === 1 && (
        <Flex mb="15px" direction="column" maxWidth="400px" p="6" gap="3">
          <Select.Root
            value={productNameForPhoto}
            onValueChange={setProductNameForPhoto}
            size="3"
          >
            <Select.Trigger
              placeholder="Select Product"
              radius="none"
              className="dropdown-trigger"
              style={{ fontFamily: 'Montserrat' }}
            />
            <Select.Content color="purple">
              <Select.Group>
                {products.map((value) => (
                  <React.Fragment key={value.id}>
                    <Select.Item value={value.name}>{value.name}</Select.Item>
                  </React.Fragment>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <FileUploadPopup
            trigger={(
              <Button color="purple" size="3" style={{ maxWidth: 210, fontFamily: 'Montserrat' }} disabled={!productNameForPhoto}>
                <UploadIcon />
                Upload photos
              </Button>
            )}
            title="Upload photos"
            onUpload={onUploadPhotos}
          />
        </Flex>
      )}
      {page === 2 && (
        <Flex mb="15px" direction="column" maxWidth="400px" p="6" gap="3">
          <Text as="label">Name</Text>
          <input
            id="categoryName"
            type="text"
            value={newCategoryName}
            onChange={(e) => {
              setNewCategoryName(e.target.value);
            }}
            required
            placeholder="Enter the name"
            className="mercahdising-input"
          />
          <Button type="submit" color="purple" size="3" style={{ fontFamily: 'Montserrat' }} onClick={onCategoryAdd}>
            <PlusCircledIcon />
            Add
          </Button>
        </Flex>
      )}
      {page === 3 && (
        <Flex mb="15px" direction="column" maxWidth="400px" p="6" gap="3">
          <Select.Root
            value={productNameForDeletion}
            onValueChange={setProductNameForDeletion}
            size="3"
          >
            <Select.Trigger
              placeholder="Select Product"
              radius="none"
              className="dropdown-trigger"
              style={{ fontFamily: 'Montserrat' }}
            />
            <Select.Content color="purple">
              <Select.Group>
                {products.map((value) => (
                  <React.Fragment key={value.id}>
                    <Select.Item value={value.name}>{value.name}</Select.Item>
                  </React.Fragment>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button color="red" style={{ fontFamily: 'Montserrat' }}>
                <TrashIcon />
                Delete
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
              <AlertDialog.Title>Delete the product</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure? This product will not be recoverable.
              </AlertDialog.Description>
              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button variant="solid" color="red" onClick={onDeleteProduct}>
                    Delete
                  </Button>
                </AlertDialog.Action>
              </Flex>

            </AlertDialog.Content>
          </AlertDialog.Root>
        </Flex>
      )}
    </form>
  );
}

export default Merchandising;
