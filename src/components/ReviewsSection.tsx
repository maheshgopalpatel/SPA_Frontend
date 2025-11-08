// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Star, Quote } from 'lucide-react';

// const ReviewsSection = () => {
//   const reviews = [
//   {
//     id: 1,
//     name: 'Priya Sharma',
//     rating: 5,
//     date: '2 weeks ago',
//     text: 'The Thai Massage was incredible! Extremely relaxing, eased all my tension, and my muscles feel rejuvenated. The therapist was professional and attentive throughout.',
//     service: 'Thai Massage',
//     verified: true
//   },
//   {
//     id: 2,
//     name: 'Rahul Kumar',
//     rating: 5,
//     date: '1 month ago',
//     text: 'Hot Stone Therapy here was amazing! The heat and massage melted away all my stress. The therapist understood exactly how much pressure I needed, and it felt perfect.',
//     service: 'Hot Stone Therapy',
//     verified: true
//   },
//   {
//     id: 3,
//     name: 'Ananya Patel',
//     rating: 5,
//     date: '3 weeks ago',
//     text: 'Healing Potli Therapy was a divine experience! The aromatic herbal compresses eased my body pain and rejuvenated my senses. Truly therapeutic and calming.',
//     service: 'Healing Potli Therapy',
//     verified: true
//   },
//   {
//     id: 4,
//     name: 'Vikram Singh',
//     rating: 4,
//     date: '1 week ago',
//     text: 'Foot Reflexology here is excellent! The massage relieved my foot fatigue completely. The staff is friendly, professional, and the environment is very clean.',
//     service: 'Foot Reflexology',
//     verified: true
//   },
//   {
//     id: 5,
//     name: 'Meera Reddy',
//     rating: 5,
//     date: '2 months ago',
//     text: 'Sublime Swedish Therapy for my bridal package was perfect! The gentle, flowing massage was relaxing and refreshing, making my special day even more memorable.',
//     service: 'Sublime Swedish Therapy',
//     verified: true
//   },
//   {
//     id: 6,
//     name: 'Arjun Mishra',
//     rating: 5,
//     date: '1 month ago',
//     text: 'Adhyanga Therapy exceeded my expectations! The warm herbal oils and rhythmic massage techniques revitalized my body and mind. Highly recommended for complete relaxation.',
//     service: 'Adhyanga Therapy',
//     verified: true
//   }
// ];


//   const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
//   const totalReviews = reviews.length;

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star 
//         key={index} 
//         className={`w-4 h-4 ${
//           index < rating 
//             ? 'fill-accent-gold text-accent-gold' 
//             : 'text-muted-foreground'
//         }`} 
//       />
//     ));
//   };

//   return (
//     <section id="reviews" className="py-20 bg-gradient-to-br from-spa-cream to-background">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16 animate-fade-in">
//           <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
//           What Our Clients Say  
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
//             Don't just take our word for it - hear from our satisfied customers
//           </p>
          
//           {/* Rating Summary */}
//           <div className="flex items-center justify-center gap-4 mb-8">
//             <div className="text-center">
//               <div className="text-4xl font-bold text-primary mb-2">
//                 {averageRating.toFixed(1)}
//               </div>
//               <div className="flex justify-center mb-2">
//                 {renderStars(Math.round(averageRating))}
//               </div>
//               <div className="text-sm text-muted-foreground">
//                 Based on {totalReviews} reviews
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Scrollable Row */}
//         <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent">
//           {reviews.map((review, index) => (
//             <Card 
//               key={review.id}
//               className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-1 animate-slide-up flex-shrink-0 w-[320px] snap-start"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <CardContent className="p-6">
//                 {/* Quote Icon */}
//                 <div className="mb-4">
//                   <Quote className="w-8 h-8 text-primary/20" />
//                 </div>

//                 {/* Review Text */}
//                 <p className="text-foreground mb-6 leading-relaxed">
//                   "{review.text}"
//                 </p>

//                 {/* Rating */}
//                 <div className="flex items-center gap-2 mb-4">
//                   {renderStars(review.rating)}
//                   <span className="text-sm text-muted-foreground ml-2">
//                     {review.date}
//                   </span>
//                 </div>

//                 {/* Service Badge */}
//                 <Badge 
//                   variant="secondary" 
//                   className="mb-4 bg-gradient-accent text-foreground"
//                 >
//                   {review.service}
//                 </Badge>

//                 {/* Customer Info */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
//                       <span className="text-primary-foreground font-semibold text-sm">
//                         {review.name.split(' ').map(n => n[0]).join('')}
//                       </span>
//                     </div>
//                     <div>
//                       <div className="font-semibold text-foreground text-sm">
//                         {review.name}
//                       </div>
//                       {review.verified && (
//                         <div className="text-xs text-primary flex items-center gap-1">
//                           <div className="w-3 h-3 bg-amber-600 rounded-full flex items-center justify-center">
//                             <span className="text-primary-foreground text-xs">✓</span>
//                           </div>
//                           Verified Customer
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Google Reviews CTA */}
//         <div className="text-center mt-16 animate-fade-in">
//           <div className="bg-amber-600 p-8 rounded-2xl shadow-strong max-w-2xl mx-auto">
//             <h3 className="text-2xl font-bold text-primary-foreground mb-4">
//               Share Your Experience
//             </h3>
//             <p className="text-primary-foreground/90 mb-6">
//               Had a great time at AB Spa? We'd love to hear from you! Leave us a review on Google.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a
//                 href="https://maps.app.goo.gl/sT44iV2xAGvBJCyg8"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center px-6 py-3 bg-white/20 border border-white/30 text-white hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-105"
//               >
//                 <Star className="w-4 h-4 mr-2" />
//                 Leave a Google Review
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewsSection;


// 15/10/2025


// import { Card, CardContent } from '@/components/ui/card'; 
// import { Badge } from '@/components/ui/badge';
// import { Star, Quote } from 'lucide-react';
// import './reviews.css'; 

// const ReviewsSection = () => {
//   const reviews = [
//     {
//       id: 1,
//       name: 'Priya Sharma',
//       rating: 5,
//       date: '2 weeks ago',
//       text: 'The Thai Massage was incredible! Extremely relaxing, eased all my tension, and my muscles feel rejuvenated. The therapist was professional and attentive throughout.',
//       service: 'Thai Massage',
//       verified: true
//     },
//     {
//       id: 2,
//       name: 'Rahul Kumar',
//       rating: 5,
//       date: '1 month ago',
//       text: 'Hot Stone Therapy here was amazing! The heat and massage melted away all my stress. The therapist understood exactly how much pressure I needed, and it felt perfect.',
//       service: 'Hot Stone Therapy',
//       verified: true
//     },
//     {
//       id: 3,
//       name: 'Ananya Patel',
//       rating: 5,
//       date: '3 weeks ago',
//       text: 'Healing Potli Therapy was a divine experience! The aromatic herbal compresses eased my body pain and rejuvenated my senses. Truly therapeutic and calming.',
//       service: 'Healing Potli Therapy',
//       verified: true
//     },
//     {
//       id: 4,
//       name: 'Vikram Singh',
//       rating: 4,
//       date: '1 week ago',
//       text: 'Foot Reflexology here is excellent! The massage relieved my foot fatigue completely. The staff is friendly, professional, and the environment is very clean.',
//       service: 'Foot Reflexology',
//       verified: true
//     },
//     {
//       id: 5,
//       name: 'Meera Reddy',
//       rating: 5,
//       date: '2 months ago',
//       text: 'Sublime Swedish Therapy for my bridal package was perfect! The gentle, flowing massage was relaxing and refreshing, making my special day even more memorable.',
//       service: 'Sublime Swedish Therapy',
//       verified: true
//     },
//     {
//       id: 6,
//       name: 'Arjun Mishra',
//       rating: 5,
//       date: '1 month ago',
//       text: 'Adhyanga Therapy exceeded my expectations! The warm herbal oils and rhythmic massage techniques revitalized my body and mind. Highly recommended for complete relaxation.',
//       service: 'Adhyanga Therapy',
//       verified: true
//     }
//   ];

//   const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
//   const totalReviews = reviews.length;

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star 
//         key={index} 
//         className={`w-4 h-4 ${index < rating ? 'fill-accent-gold text-accent-gold' : 'text-muted-foreground'}`} 
//       />
//     ));
//   };

//   return (
//     <section id="reviews" className="py-20 bg-gradient-to-br from-spa-cream to-background">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16 animate-fade-in">
//   <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
//     What Our Clients Say
//   </h2>
//   <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
//     Don't just take our word for it - hear from our satisfied customers
//   </p>

//   {/* Rating Summary */}
//   <div className="flex items-center justify-center gap-4 mb-8">
//     <div className="text-center">
//       <div className="text-4xl font-bold text-primary dark:text-yellow-400 mb-2">
//         {averageRating.toFixed(1)}
//       </div>
//       <div className="flex justify-center mb-2 text-yellow-400">
//         {renderStars(Math.round(averageRating))}
//       </div>
//       <div className="text-sm text-gray-600 dark:text-white-400">
//         Based on {totalReviews} reviews
//       </div>
//     </div>
//   </div>
// </div>


//         {/* Reviews Auto-Scroll */}
//         <div className="scroll-container">
//           <div className="scroll-content">
//             {reviews.concat(reviews).map((review, index) => (
//               <Card 
//                 key={index}
//                 className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-1 flex-shrink-0 w-[320px]"
//               >
//                 <CardContent className="p-6">
//                   {/* Quote Icon */}
//                   <div className="mb-4">
//                     <Quote className="w-8 h-8 text-primary/20" />
//                   </div>

//                   {/* Review Text */}
//                   <p className="text-foreground mb-6 leading-relaxed">
//                     "{review.text}"
//                   </p>

//                   {/* Rating */}
//                   <div className="flex items-center gap-2 mb-4">
//                     {renderStars(review.rating)}
//                     <span className="text-sm text-muted-foreground ml-2">
//                       {review.date}
//                     </span>
//                   </div>

//                   {/* Service Badge */}
//                   <Badge 
//                     variant="secondary" 
//                     className="mb-4 bg-gradient-accent text-foreground"
//                   >
//                     {review.service}
//                   </Badge>

//                   {/* Customer Info */}
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
//                         <span className="text-primary-foreground font-semibold text-sm">
//                           {review.name.split(' ').map(n => n[0]).join('')}
//                         </span>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-foreground text-sm">
//                           {review.name}
//                         </div>
//                         {review.verified && (
//                           <div className="text-xs text-primary flex items-center gap-1">
//                             <div className="w-3 h-3 bg-amber-600 rounded-full flex items-center justify-center">
//                               <span className="text-primary-foreground text-xs">✓</span>
//                             </div>
//                             Verified Customer
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Google Reviews CTA */}
//         <div className="text-center mt-16 animate-fade-in">
//           <div className="bg-amber-600 p-8 rounded-2xl shadow-strong max-w-2xl mx-auto">
//             <h3 className="text-2xl font-bold text-primary-foreground mb-4">
//               Share Your Experience
//             </h3>
//             <p className="text-primary-foreground/90 mb-6">
//               Had a great time at AB Spa? We'd love to hear from you! Leave us a review on Google.
//             </p>
//          <div className="flex flex-col sm:flex-row gap-4 justify-center">
//   <a
//     href="https://maps.app.goo.gl/sT44iV2xAGvBJCyg8"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="inline-flex items-center justify-center px-6 py-3
//                bg-amber-600 text-white
//                dark:bg-green-100 dark:text-black
//                border border-primary dark:border-green-500
//                rounded-lg transition-all duration-300 hover:scale-105 hover:opacity-90"
//   >
//     <Star className="w-4 h-4 mr-2" />
//     Leave a Google Review
//   </a>
// </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewsSection;


import { Card, CardContent } from '@/components/ui/card'; 
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      date: '2 weeks ago',
      text: 'The Thai Massage was incredible! Extremely relaxing, eased all my tension, and my muscles feel rejuvenated. The therapist was professional and attentive throughout.',
      service: 'Thai Massage',
      verified: true
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      rating: 5,
      date: '1 month ago',
      text: 'Hot Stone Therapy here was amazing! The heat and massage melted away all my stress. The therapist understood exactly how much pressure I needed, and it felt perfect.',
      service: 'Hot Stone Therapy',
      verified: true
    },
    {
      id: 3,
      name: 'Ananya Patel',
      rating: 5,
      date: '3 weeks ago',
      text: 'Healing Potli Therapy was a divine experience! The aromatic herbal compresses eased my body pain and rejuvenated my senses. Truly therapeutic and calming.',
      service: 'Healing Potli Therapy',
      verified: true
    },
    {
      id: 4,
      name: 'Vikram Singh',
      rating: 4,
      date: '1 week ago',
      text: 'Foot Reflexology here is excellent! The massage relieved my foot fatigue completely. The staff is friendly, professional, and the environment is very clean.',
      service: 'Foot Reflexology',
      verified: true
    },
    {
      id: 5,
      name: 'Meera Reddy',
      rating: 5,
      date: '2 months ago',
      text: 'Sublime Swedish Therapy for my bridal package was perfect! The gentle, flowing massage was relaxing and refreshing, making my special day even more memorable.',
      service: 'Sublime Swedish Therapy',
      verified: true
    },
    {
      id: 6,
      name: 'Arjun Mishra',
      rating: 5,
      date: '1 month ago',
      text: 'Adhyanga Therapy exceeded my expectations! The warm herbal oils and rhythmic massage techniques revitalized my body and mind. Highly recommended for complete relaxation.',
      service: 'Adhyanga Therapy',
      verified: true
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-3 sm:w-4 h-3 sm:h-4 ${index < rating ? 'fill-accent-gold text-accent-gold' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <section id="reviews" className="py-12 sm:py-16 bg-gradient-to-br from-spa-cream to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-6 sm:mb-8">
            Don't just take our word for it - hear from our satisfied customers
          </p>

          {/* Rating Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary dark:text-yellow-400">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center text-yellow-400 gap-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-white-400">
              Based on {totalReviews} reviews
            </div>
          </div>
        </div>

        {/* Reviews Horizontal Scroll */}
        <div className="overflow-x-auto py-2 sm:py-4">
          <div className="flex gap-3 min-w-max">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-1 flex-shrink-0 w-60 sm:w-64 md:w-72"
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="mb-2 sm:mb-3">
                    <Quote className="w-5 sm:w-6 h-5 sm:h-6 text-primary/20" />
                  </div>

                  <p className="text-[10px] sm:text-xs md:text-sm text-foreground mb-3 sm:mb-4 leading-snug">
                    "{review.text.length > 80 ? review.text.slice(0, 80) + '...' : review.text}"
                  </p>

                  <div className="flex items-center gap-1 mb-2 sm:mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 sm:w-3 sm:h-3 ${i < review.rating ? 'fill-accent-gold text-accent-gold' : 'text-muted-foreground'}`}
                      />
                    ))}
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground ml-1">{review.date}</span>
                  </div>

                  <Badge variant="secondary" className="mb-2 sm:mb-3 bg-gradient-accent text-foreground text-[9px] sm:text-xs">
                    {review.service}
                  </Badge>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-600 rounded-full flex items-center justify-center text-[8px] sm:text-xs">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-[10px] sm:text-xs">{review.name}</div>
                      {review.verified && (
                        <div className="text-[8px] sm:text-[9px] text-primary flex items-center gap-1">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-600 rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground text-[8px] sm:text-[9px]">✓</span>
                          </div>
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;


