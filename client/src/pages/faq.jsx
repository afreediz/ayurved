import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "What is A2-A2 milk and why is it better?",
      answer: "A2-A2 milk comes from indigenous cows and contains only A2 beta-casein, which is natural, easy to digest, and beneficial. It's free from the side effects of A1 beta-casein, which has been linked to various chronic health conditions. This makes it a healthier choice for your family's nutrition needs."
    },
    {
      question: "How is FGOF different from regular dairy farms?",
      answer: "We follow zero-chemical, traditional Biodynamic methods. Our cows graze freely, eat seasonal herbs and grains, fruits, and are never injected with harmful hormones. This natural approach ensures the highest quality milk while maintaining the health and happiness of our indigenous cows."
    },
    {
      question: "How can I support the mission?",
      answer: "You can support us by donating, volunteering, spreading awareness, or choosing A2-based organic products from indigenous breeds. Even by raising an INDIGENOUS COW in your own space! Every small action contributes to preserving our traditional farming methods and indigenous cow breeds."
    },
    {
      question: "Where are your farms located?",
      answer: "Our main farm is located in Kerala, Thrissur, spread across acres of naturally herbal grass lush, sustainable land. The fertile soil and tropical climate of Kerala provide the perfect environment for our indigenous cows to thrive naturally."
    },
    {
      question: "What is Ashwagandha, Shatavari and Brahmi Ghee?",
      answer: "These are our premium Ayurvedic ghee varieties made from pure A2-A2 milk. Ashwagandha Ghee helps with stress relief and immunity, Shatavari Ghee supports women's health and hormonal balance, while Brahmi Ghee enhances cognitive function and mental clarity. All are prepared using traditional methods with authentic herbs."
    },
    {
      question: "What are the ingredients of our pain relief product, A2-A2 MILK Oil?",
      answer: "Our A2-A2 MILK Oil is crafted with pure A2 milk as the base, combined with traditional Ayurvedic herbs known for their anti-inflammatory and pain-relieving properties. The exact formulation includes time-tested ingredients that provide natural relief for joint pain, muscle aches, and inflammation."
    },
    {
      question: "Do the cows get enough nutrition from natural 'NAVDHANYA' food only?",
      answer: "Absolutely! NAVDHANYA (nine grains) provides complete nutrition that our indigenous cows have thrived on for centuries. This traditional feed combination includes various grains, pulses, and seeds that offer all essential nutrients. Our cows also graze on natural herbal grass, ensuring they receive optimal nutrition naturally."
    },
    {
      question: "What are the ingredients and benefits of our health and wellness product, 'WHEY WATER'?",
      answer: "WHEY WATER is the natural liquid left after curdling A2-A2 milk. Rich in proteins, vitamins, and minerals, it aids digestion, boosts immunity, and provides natural probiotics. This traditional wellness drink helps in detoxification, improves gut health, and provides essential nutrients in their most bioavailable form."
    }
  ];

  return (
    <div className="">
      {/* Header Section */}
      <div className="text-center mb-12 py-12">
        <div className="flex justify-center mb-4">
          <HelpCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-5xl font-semibold text-slate-800 text-center mb-4 lg:mb-8 max-w-3xl mx-auto tracking-wide">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Everything you need to know about FGOF, our A2-A2 milk, and traditional farming practices
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4 max-w-5xl mx-auto p-3">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center group"
            >
              <h3 className="text-lg font-semibold text-slate-800 pr-4 group-hover:text-green-600 transition-colors">
                {item.question}
              </h3>
              <div className="flex-shrink-0">
                {openItems.has(index) ? (
                  <ChevronUp className="w-5 h-5 text-green-500 transform transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-green-500 transform transition-transform duration-200" />
                )}
              </div>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5 bg-gradient-to-r from-green-50 to-white">
                <div className="w-full h-px bg-gradient-to-r from-green-200 to-transparent mb-4"></div>
                <p className="text-gray-700 leading-relaxed text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default FAQ;