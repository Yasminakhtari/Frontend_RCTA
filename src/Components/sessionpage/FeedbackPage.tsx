import React, { useEffect, useState } from 'react';
import { getAllFeedback, saveFeedback } from '../../Services/FeedbackService';
import { useSelector } from 'react-redux';
import { Avatar, Text } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const FeedbackPage: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reaction, setReaction] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user);

  const reactions = [
    '😭', // 1 star
    '😞', // 2 stars
    '😐', // 3 stars
    '😊', // 4 stars
    '😍'  // 5 stars
  ];

  useEffect(() => {
    setReaction(reactions[rating - 1] || '');
  }, [rating]);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const feedbackData = { name: user?.data?.userDetails?.firstName, message: description, rating };
      await saveFeedback(feedbackData);
      setSubmitted(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Confetti lasts for 5 seconds
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={400}
          onConfettiComplete={() => setShowConfetti(false)}
          className="w-full h-full"
        />
      )}

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-8 border-transparent 
          hover:border-gradient-to-r from-blue-200 to-purple-200 transition-all duration-300"
      >
        {submitted ? (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-6xl"
            >
              🎉
            </motion.div>
            <Text className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Thank You! 🎾
            </Text>
            <p className="text-gray-600 mt-2">
              Your feedback helps us improve!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-8 text-center">
              <Avatar 
                src={user?.data?.userDetails?.profile} 
                size="xl" 
                className="mx-auto mb-4 border-4 border-blue-200"
              />
              <Text className="text-2xl font-bold text-gray-800 mb-2">
                👋 Hey {user?.data?.userDetails?.firstName}!
              </Text>
              <Text className="text-gray-600">
                How was your experience with us?
              </Text>
            </div>

            <div className="mb-8">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={reaction}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="text-center text-6xl mb-4"
                >
                  {reaction}
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-4xl ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}

                  >
                    ⭐
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tell us more (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 
                  focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                rows={4}
                placeholder="What did you love? What can we improve?"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading || rating === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg
                font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Submit Feedback ✨'}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default FeedbackPage;