
import { useCartStore } from './cartStore';
import type { CartItem } from './cartStore';

// Mock product data for testing
const product1: Omit<CartItem, 'quantity'> = {
  id: 1,
  title: 'Test Product 1',
  price: 10,
  image: 'test1.jpg',
};

const product2: Omit<CartItem, 'quantity'> = {
  id: 2,
  title: 'Test Product 2',
  price: 25,
  image: 'test2.jpg',
};

describe('useCartStore', () => {

  // Reset the store's state before each test to ensure isolation
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it('should add a new item to the cart', () => {
    // Act: add the item
    useCartStore.getState().addItem(product1);

    // Assert: check if the item is in the cart
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({ ...product1, quantity: 1 });
  });

  it('should increase the quantity if the same item is added again', () => {
    // Arrange: add the item once
    useCartStore.getState().addItem(product1);
    
    // Act: add the same item again
    useCartStore.getState().addItem(product1);

    // Assert: check the quantity
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should remove an item from the cart', () => {
    // Arrange: add two items
    useCartStore.getState().addItem(product1);
    useCartStore.getState().addItem(product2);

    // Act: remove the first item
    useCartStore.getState().removeItem(product1.id);

    // Assert: check the cart contents
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(product2.id);
  });

  it('should decrease quantity and remove the item if quantity becomes 0', () => {
    // Arrange: add an item
    useCartStore.getState().addItem(product1);

    // Act: decrease the quantity
    useCartStore.getState().decreaseQuantity(product1.id);

    // Assert: the item should be removed
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
  });

  it('should correctly calculate the total number of items', () => {
    // Arrange: add items
    useCartStore.getState().addItem(product1); // quantity becomes 1
    useCartStore.getState().addItem(product1); // quantity becomes 2
    useCartStore.getState().addItem(product2); // quantity becomes 1

    // Act & Assert: check total items
    expect(useCartStore.getState().getTotalItems()).toBe(3);
  });

  it('should correctly calculate the total price', () => {
    // Arrange: add items
    useCartStore.getState().addItem(product1); // price 10, quantity 1
    useCartStore.getState().addItem(product1); // price 10, quantity 2 -> 20
    useCartStore.getState().addItem(product2); // price 25, quantity 1 -> 25
    
    // Act & Assert: check total price (20 + 25 = 45)
    expect(useCartStore.getState().getTotalPrice()).toBe(45);
  });

  it('should clear the cart', () => {
    // Arrange: add items
    useCartStore.getState().addItem(product1);
    useCartStore.getState().addItem(product2);

    // Act: clear the cart
    useCartStore.getState().clearCart();

    // Assert: cart should be empty
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.getTotalItems()).toBe(0);
    expect(state.getTotalPrice()).toBe(0);
  });
});