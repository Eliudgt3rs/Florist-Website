/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import {
  Search,
  Phone,
  MessageCircle,
  ShoppingCart,
  Star,
  MapPin,
  Clock,
  Leaf,
  Heart,
  Gift,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const FlowerCard = ({ flower, onAddToCart }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
    <div className="relative">
      <img
        src={flower.image}
        alt={flower.name}
        className="w-full h-64 object-cover"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
        KSh {flower.price}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{flower.name}</h3>
      <p className="text-gray-600 mb-3 text-sm leading-relaxed">
        {flower.description}
      </p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {flower.category}
        </span>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < flower.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => onAddToCart(flower)}
        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  </div>
);

// Pagination component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      {/* Results info */}
      <div className="text-sm text-gray-600">
        Showing {startItem}-{endItem} of {totalItems} flowers
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    currentPage === page
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Items per page selector */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onPageChange(1, parseInt(e.target.value))}
          className="border border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={16}>16</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

// Cart component
const Cart = ({ cartItems, onRemoveFromCart, onCloseCart, onCheckout }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-pink-200 bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-lg p-6 overflow-y-auto relative">
        <button
          onClick={onCloseCart}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <p className="text-gray-500">Add some beautiful flowers!</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        KSh {item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-pink-600">
                  KSh {total}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Proceed to WhatsApp Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

type Flower = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
};

type CartItem = Flower & { quantity: number };

const DaisyFloristWebsite = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const flowers = [
    {
      id: 1,
      name: "Red Roses",
      price: 900,
      category: "Roses",
      description:
        "Classic red roses perfect for expressing love and passion. Fresh, fragrant, and beautifully arranged.",
      image:
        "RedRoses.jpeg",
      rating: 5,
    },
    {
      id: 2,
      name: "White Lilies",
      price: 800,
      category: "Lilies",
      description:
        "Elegant white lilies symbolizing purity and rebirth. Perfect for special occasions and ceremonies.",
      image:
        "WhiteLillies.jpeg",
      rating: 4,
    },
    {
      id: 3,
      name: "Sunflowers",
      price: 950,
      category: "Seasonal",
      description:
        "Bright, cheerful sunflowers that bring joy and warmth to any space. Symbol of happiness and optimism.",
      image:
        "SunFlower.jpeg",
      rating: 4,
    },
    {
      id: 4,
      name: "Pink Tulips",
      price: 900,
      category: "Tulips",
      description:
        "Delicate pink tulips representing affection and caring. Perfect for spring celebrations.",
      image:
        "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&h=300&fit=crop",
      rating: 5,
    },
    {
      id: 5,
      name: "Purple Orchids",
      price: 1200,
      category: "Orchids",
      description:
        "Exotic purple orchids representing luxury and strength. A sophisticated choice for special moments.",
      image:
        "PurpleOrchids.jpeg",
      rating: 5,
    },
    {
      id: 6,
      name: "Yellow Daisies",
      price: 3000,
      category: "Daisies",
      description:
        "Fresh yellow daisies symbolizing new beginnings and loyal love. Bright and cheerful.",
      image:
  "Yellow-Daisy-Bouquet.jpg",
      rating: 4,
    },
    {
      id: 7,
      name: "White Roses",
      price: 3550,
      category: "Roses",
      description:
        "Pure white roses signifying new beginnings and true love. Elegant and timeless.",
      image:
        "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop",
      rating: 5,
    },
    {
      id: 8,
      name: "Mixed Carnations",
      price: 4500,
      category: "Carnations",
      description:
        "Colorful carnations in mixed hues. Long-lasting flowers perfect for daily arrangements.",
      image:
        "MixedCarnations.jpeg",
      rating: 4,
    },
    {
      id: 9,
      name: "Blue Hydrangeas",
      price: 2900,
      category: "Seasonal",
      description:
        "Beautiful blue hydrangeas representing heartfelt emotions and gratitude. Perfect for special occasions.",
      image:
        "BlueHydrangeas.jpg",
      rating: 5,
    },
    {
      id: 10,
      name: "Orange Marigolds",
      price: 1250,
      category: "Seasonal",
      description:
        "Vibrant orange marigolds bringing warmth and positive energy. Perfect for celebrations.",
      image:
        "OrangeMarigolds.jpeg",
      rating: 4,
    },
    {
      id: 11,
      name: "Pink Roses",
      price: 920,
      category: "Roses",
      description:
        "Soft pink roses expressing gratitude and appreciation. Delicate and romantic.",
      image:
        "PinkRoses.jpeg",
      rating: 5,
    },
    {
      id: 12,
      name: "White Orchids",
      price: 1100,
      category: "Orchids",
      description:
        "Pure white orchids symbolizing elegance and beauty. A luxurious choice for any occasion.",
      image:
        "WhiteOrchids.jpeg",
      rating: 5,
    },
    {
      id: 13,
      name: "Red Tulips",
      price: 2180,
      category: "Tulips",
      description:
        "Bold red tulips declaring deep love and passion. Perfect for romantic gestures.",
      image:
        "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=400&h=300&fit=crop",
      rating: 5,
    },
    {
      id: 14,
      name: "Lavender",
      price: 4000,
      category: "Herbs",
      description:
        "Fragrant lavender stems bringing calm and serenity. Perfect for relaxation and aromatherapy.",
      image:
        "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400&h=300&fit=crop",
      rating: 4,
    },
    {
      id: 15,
      name: "White Daisies",
      price: 2800,
      category: "Daisies",
      description:
        "Classic white daisies representing innocence and purity. Simple yet beautiful.",
      image:
        "OIP.jpeg",
      rating: 4,
    },
    {
      id: 16,
      name: "Purple Tulips",
      price: 4000,
      category: "Tulips",
      description:
        "Rich purple tulips symbolizing royalty and elegance. A sophisticated choice.",
      image:
        "PurpleTulips.jpeg",
      rating: 5,
    },
    {
      id: 17,
      name: "Pink Carnations",
      price: 4000,
      category: "Carnations",
      description:
        "Sweet pink carnations expressing gratitude and admiration. Long-lasting and fragrant.",
      image:
        "PinkCarnations.jpeg",
      rating: 4,
    },
    {
      id: 18,
      name: "Yellow Roses",
      price: 4000,
      category: "Roses",
      description:
        "Bright yellow roses symbolizing friendship and joy. Perfect for celebrating special bonds.",
      image:
        "YellowRoses.jpg",
      rating: 4,
    },
    {
      id: 19,
      name: "Orange Lilies",
      price: 2250,
      category: "Lilies",
      description:
        "Vibrant orange lilies representing confidence and pride. Bold and beautiful.",
      image:
        "OrangeLilies.jpeg",
      rating: 5,
    },
    {
      id: 20,
      name: "Baby's Breath",
      price: 9000,
      category: "Fillers",
      description:
        "Delicate baby's breath perfect for adding texture and elegance to arrangements.",
      image:
        "Baby'sBreath.jpeg",
      rating: 4,
    },
    {
      id: 21,
      name: "Peach Roses",
      price: 3000,
      category: "Roses",
      description:
        "Soft peach roses expressing appreciation and gratitude. Warm and inviting.",
      image:
        "PeachRoses.jpeg",
      rating: 5,
    },
    {
      id: 22,
      name: "Purple Irises",
      price: 2000,
      category: "Seasonal",
      description:
        "Elegant purple irises symbolizing wisdom and valor. Perfect for meaningful occasions.",
      image:
        "PurpleIrisesjpeg.jpeg",
      rating: 5,
    },
    {
      id: 23,
      name: "White Tulips",
      price: 4000,
      category: "Tulips",
      description:
        "Pure white tulips representing forgiveness and new beginnings. Clean and elegant.",
      image:
        "WhiteTulips.jpg",
      rating: 5,
    },
    {
      id: 24,
      name: "Red Carnations",
      price: 2000,
      category: "Carnations",
      description:
        "Bold red carnations expressing deep love and admiration. Classic and long-lasting.",
      image:
        "RedCarnations.jpeg",
      rating: 4,
    },
    {
      id: 25,
      name: "Pink Orchids",
      price: 1150,
      category: "Orchids",
      description:
        "Delicate pink orchids representing femininity and grace. Luxurious and exotic.",
      image:
        "PinkOrchids.jpeg",
      rating: 5,
    },
    {
      id: 26,
      name: "Eucalyptus",
      price: 3000,
      category: "Greenery",
      description:
        "Fresh eucalyptus branches adding natural fragrance and texture to arrangements.",
      image:
        "Eucalyptus.jpeg",
      rating: 4,
    },
    {
      id: 27,
      name: "Mixed Roses Bouquet",
      price: 4200,
      category: "Bouquets",
      description:
        "Beautiful mixed roses bouquet combining multiple colors for a stunning arrangement.",
      image:
        "MixedRosesBouquet.jpeg",
      rating: 5,
    },
    {
      id: 28,
      name: "Purple Lavender",
      price: 4900,
      category: "Herbs",
      description:
        "Aromatic purple lavender stems perfect for relaxation and natural fragrance.",
      image:
        "PurpleLavender.jpeg",
      rating: 4,
    },
    {
      id: 29,
      name: "Pink Lilies",
      price: 780,
      category: "Lilies",
      description:
        "Soft pink lilies representing prosperity and abundance. Elegant and fragrant.",
      image:
        "PinkLilies.jpeg",
      rating: 5,
    },
    {
      id: 30,
      name: "Yellow Tulips",
      price: 560,
      category: "Tulips",
      description:
        "Cheerful yellow tulips bringing sunshine and happiness. Perfect for spring celebrations.",
      image:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
      rating: 4,
    },
    {
      id: 31,
      name: "White Carnations",
      price: 790,
      category: "Carnations",
      description:
        "Pure white carnations symbolizing pure love and good luck. Classic and elegant.",
      image:
        "WhiteCarnations.jpeg",
      rating: 4,
    },
    {
      id: 32,
      name: "Orange Roses",
      price: 2000,
      category: "Roses",
      description:
        "Vibrant orange roses expressing enthusiasm and desire. Bold and passionate.",
      image:
        "OrangeRoses.jpeg",
      rating: 5,
    },
    {
      id: 33,
      name: "Blue Delphiniums",
      price: 2100,
      category: "Seasonal",
      description:
        "Tall blue delphiniums representing big-hearted nature and fun. Perfect for height in arrangements.",
      image:
        "BlueDelphiniums.jpeg",
      rating: 5,
    },
    {
      id: 34,
      name: "Pink Peonies",
      price: 950,
      category: "Seasonal",
      description:
        "Lush pink peonies symbolizing romance, prosperity, and good fortune. Luxurious and full.",
      image:
        "PinkPeonies.jpg",
      rating: 5,
    },
    {
      id: 35,
      name: "White Peonies",
      price: 980,
      category: "Seasonal",
      description:
        "Elegant white peonies representing honor and wealth. Perfect for sophisticated arrangements.",
      image:
        "WhitePeonies.jpeg",
      rating: 5,
    },
    {
      id: 36,
      name: "Purple Roses",
      price: 650,
      category: "Roses",
      description:
        "Unique purple roses symbolizing enchantment and love at first sight. Rare and beautiful.",
      image:
        "PurpleRoses.jpeg",
      rating: 5,
    },
    {
      id: 37,
      name: "Gerbera Daisies",
      price: 6000,
      category: "Daisies",
      description:
        "Colorful gerbera daisies representing cheerfulness and innocence. Bright and cheerful.",
      image:
        "GerberaDaisies.jpeg",
      rating: 4,
    },
    {
      id: 38,
      name: "Chrysanthemums",
      price: 2000,
      category: "Seasonal",
      description:
        "Beautiful chrysanthemums symbolizing optimism and joy. Perfect for autumn arrangements.",
      image:
        "Chrysanthemums.jpeg",
      rating: 4,
    },
    {
      id: 39,
      name: "Bird of Paradise",
      price: 15000,
      category: "Exotic",
      description:
        "Exotic bird of paradise flowers representing magnificence and wonderful anticipation.",
      image:
        "BirdofParadise.jpeg",
      rating: 5,
    },
    {
      id: 40,
      name: "Anthurium",
      price: 1500,
      category: "Exotic",
      description:
        "Glossy anthurium flowers symbolizing hospitality and abundance. Modern and tropical.",
      image:
        "Anthurium.jpeg",
      rating: 5,
    },
  ];

  const categories = [
    "All",
    "Roses",
    "Lilies",
    "Tulips",
    "Orchids",
    "Daisies",
    "Carnations",
    "Seasonal",
    "Bouquets",
    "Exotic",
    "Herbs",
    "Greenery",
    "Fillers",
  ];

  const filteredFlowers = flowers.filter((flower) => {
    const matchesCategory =
      selectedCategory === "All" || flower.category === selectedCategory;
    const matchesSearch =
      (flower.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (flower.description ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredFlowers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFlowers = filteredFlowers.slice(startIndex, endIndex);

  const handlePageChange = (page, newItemsPerPage = itemsPerPage) => {
    if (newItemsPerPage !== itemsPerPage) {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
    } else {
      setCurrentPage(page);
    }
    // Smooth scroll to top of flower section
    document
      .getElementById("flower-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (flowerToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === flowerToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === flowerToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...flowerToAdd, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (idToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== idToRemove)
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before proceeding to order.");
      return;
    }

    const orderDetails = cartItems
      .map((item) => `${item.name} (KSh ${item.price}) x ${item.quantity}`)
      .join("\n");

    const totalOrderPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const message = `Hi! I'd like to order the following flowers:\n\n${orderDetails}\n\nTotal: KSh ${totalOrderPrice}\n\nPlease let me know about availability and delivery options.`;
    const whatsappUrl = `https://wa.me/254719790026?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Daisy Does It
                </h1>
                <p className="text-sm text-gray-600">
                  Premium Florist in Kenya
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="tel:+254719790026"
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Call Us</span>
              </a>
              <a
                href="https://wa.me/254719790026"
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className={`relative py-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
            Beautiful Flowers for Every Occasion
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Welcome to Daisy Does It - Kenya's premier florist. We bring you the
            freshest, most beautiful flowers with convenient WhatsApp ordering
            and M-Pesa payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-pink-500" />
              <span>Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-pink-500" />
              <span>Mon-Sun: 8AM - 8PM</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Gift className="w-5 h-5 text-pink-500" />
              <span>Same Day Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className=" bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search flowers..."
                className="w-fit pl-10 pr-4 py-3 border border-gray-200 rounded-4xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-1 space-x-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-pink-50 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flower Catalogue */}
      <section id="flower-section" className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Our Flower Collection
            </h3>
            <p className="text-lg text-gray-600">
              Discover our carefully curated selection of fresh, beautiful
              flowers
            </p>
          </div>

          {currentFlowers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentFlowers.map((flower) => (
                  <FlowerCard
                    key={flower.id}
                    flower={flower}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredFlowers.length}
                itemsPerPage={itemsPerPage}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h4 className="text-xl font-semibold text-gray-600 mb-2">
                No flowers found
              </h4>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How to Order */}
      <section className="py-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-2">
            <h3 className="text-4xl font-bold mb-4">How to Order</h3>
            <p className="text-lg opacity-90">
              Simple steps to get your beautiful flowers delivered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2">
                1. Choose & WhatsApp
              </h4>
              <p className="opacity-90">
                Select your favorite flowers and click "Add to Cart" to build
                your order
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2">
                2. Review Cart & Checkout
              </h4>
              <p className="opacity-90">
                Review your selected items in the cart and proceed to WhatsApp
                order
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Pay & Receive</h4>
              <p className="opacity-90">
                Confirm details via WhatsApp, pay securely via M-Pesa, and
                receive your fresh flowers with love
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="flex justify-center gap-6 mb-8">
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                View Cart & Order
              </button>
            </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-xl">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold">Daisy Does It</h4>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Kenya's premier florist bringing you the freshest, most
                beautiful flowers for every occasion. Quality, beauty, and
                customer satisfaction guaranteed.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-pink-400" />
                  <span className="text-gray-300">+254 719 790 026</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-pink-400" />
                  <span className="text-gray-300">WhatsApp Orders</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-pink-400" />
                  <span className="text-gray-300">Nairobi, Kenya</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-pink-400" />
                  <span className="text-gray-300">Mon-Sun: 8AM - 8PM</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Fresh Flower Arrangements</li>
                <li>• Wedding & Event Flowers</li>
                <li>• Corporate Arrangements</li>
                <li>• Same Day Delivery</li>
                <li>• Custom Bouquets</li>
                <li>• WhatsApp Ordering</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Daisy Does It. All rights reserved. | Made with ❤️ in Kenya
            </p>
            
          </div>
        </div>
      </footer>

      {/* Cart Modal/Sidebar */}
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onCloseCart={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default DaisyFloristWebsite;
