import React from "react";
import { Wrapped, Title, WrappedMenu, WrappedContent, TextBehind, Container } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import BoxContent from "../../components/boxcontentComps/boxcontent";
import Line from "../../components/lineComps/line";
import slider1 from '../../assest/image/slider1.jpg';
import slider2 from '../../assest/image/slider2.jpg';
import slider3 from '../../assest/image/slider3.jpg';
import { useQuery } from "@tanstack/react-query";
import * as MealService from '../../services/mealservice';

const MenuPage = () => {
  console.log("MenuPage rendered");
  const sliderImages = [slider1, slider2, slider3];

  const typeColors = {
    burger: '#A11D25',
    salad: '#18441A',
    starter: '#121212',
    fries: '#D2691E',
    drink: '#23395d',
  };

  const fetchMealAll = async () => {
    const res = await MealService.getAllMeal()
    console.log("res", res)
    return res
  }
  
  const {data: meal} = useQuery({
    queryKey: ['meal'],
    queryFn: fetchMealAll,
    retry: 3,
    retryDelay: 1000
  })

  const mealTypes = [...new Set(meal?.data?.map(item => item.type))];

  return (
    <>
      <Container>
        <SliderComponent sliderImages={sliderImages}/>
        <Line />
        <WrappedMenu>
          <div style={{ position: 'relative'}}>
            <Title style={{ fontSize: '200px'}}>MENU</Title>
            <TextBehind>CHOPS</TextBehind>
          </div>
          <Title>Choose your best dishes</Title>
          {mealTypes?.map((type) => (
            <>
              <Wrapped 
                key={type} 
                style={{ backgroundColor: typeColors[type.toLowerCase()] || '#ffffff' }} // Apply background color
              >
                <Title style={{ margin: '130px',  color: '#f6ac00' }}>{type.toUpperCase()}</Title>
                <WrappedContent>
                  {meal?.data
                    ?.filter(mealItem => mealItem.type === type)
                    .map((mealItem) => (
                      <BoxContent 
                        key={mealItem._id} 
                        description={mealItem.description} 
                        name={mealItem.name} 
                        price={mealItem.price} 
                        image={mealItem.image}
                      />
                    ))}
                </WrappedContent>
            </Wrapped>
            <Line />
            </>
          ))}
        </WrappedMenu>
      </Container>
    </>
  );
};

export default MenuPage;