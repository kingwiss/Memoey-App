import { useState } from 'react';
import './FloatingButtons.css';

interface FloatingButtonsProps {
  onNavigateToSubmissions?: () => void;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onNavigateToSubmissions }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isThankYouVisible, setIsThankYouVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);
    
    try {
      // Using FormSubmit.co service
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);
      
      // Direct submission to FormSubmit.co using their AJAX endpoint
      const response = await fetch('https://formsubmit.co/ajax/fredwisseh@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      
      const responseData = await response.json();
      
      if (!response.ok || responseData.success === false) {
        throw new Error(responseData.message || 'Form submission failed');
      }
      
      // Show thank you message
      setIsThankYouVisible(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDonate = () => {
    // Open the PayPal donation link in a new tab
    window.open('https://www.paypal.com/donate/?hosted_button_id=F43AMH37AFXCE', '_blank');
  };

  return (
    <>
      <div className="floating-buttons">
        <button
          className="floating-button"
          onClick={handleDonate}
          aria-label="Donate"
        >
          💝
        </button>
        <button
          className="floating-button"
          onClick={() => setIsContactModalOpen(true)}
          aria-label="Contact Us"
        >
          ✉️
        </button>
      </div>

      {isContactModalOpen && (
        <div className="contact-modal-overlay" onClick={(e) => {
          // Close modal when clicking on overlay (outside the modal)
          if (e.target === e.currentTarget) {
            setIsContactModalOpen(false);
            setIsThankYouVisible(false);
            setFormData({
              name: '',
              email: '',
              message: ''
            });
          }
        }}>
          <div className="contact-modal">
            <button
              className="modal-close-button"
              onClick={() => {
                setIsContactModalOpen(false);
                setIsThankYouVisible(false);
                setFormData({
                  name: '',
                  email: '',
                  message: ''
                });
              }}
              aria-label="Close modal"
            >
              ×
            </button>
            
            {!isThankYouVisible ? (
              <>
                <h2 className="contact-form-title">Contact Us</h2>
                <p className="contact-form-subtitle">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* FormSubmit.co configuration */}
                  <input type="hidden" name="_subject" value="Memory Trainer Contact Form Submission" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_honey" value="" style={{ display: 'none' }} />
                  <input type="hidden" name="_autoresponse" value="Thank you for your message! We'll get back to you soon." />
                  
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message here..."
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            ) : (
              <div className="thank-you-message">
                <div className="success-icon">✓</div>
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. We'll get back to you soon!</p>
                <button 
                  className="submit-button" 
                  onClick={() => {
                    setIsContactModalOpen(false);
                    setIsThankYouVisible(false);
                    setFormData({
                      name: '',
                      email: '',
                      message: ''
                    });
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};