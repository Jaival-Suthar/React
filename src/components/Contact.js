import { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { Divider } from 'primereact/divider';
import { Rating } from 'primereact/rating';
import { Calendar } from 'primereact/calendar';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        rating: 0,
        preferredDate: null
    });
    const toast = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        toast.current.show({
            severity: 'success',
            summary: 'Message Sent',
            detail: 'Thank you for your feedback! We will get back to you soon.',
            life: 3000
        });
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            rating: 0,
            preferredDate: null
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="surface-ground p-4">
            <Toast ref={toast} />
            <div className="grid">
                <div className="col-12 md:col-8 md:col-offset-2">
                    <Card title="Contact Us" className="mb-4">
                        <div className="grid">
                            <div className="col-12 md:col-6">
                                <div className="text-center mb-4">
                                    <i className="pi pi-envelope text-6xl text-primary mb-3"></i>
                                    <h2 className="text-2xl font-bold">Get in Touch</h2>
                                    <p className="text-500">We'd love to hear from you!</p>
                                </div>
                                <div className="flex flex-column gap-3">
                                    <div className="flex align-items-center gap-2">
                                        <i className="pi pi-map-marker text-primary"></i>
                                        <span>123 Food Street, Restaurant City</span>
                                    </div>
                                    <div className="flex align-items-center gap-2">
                                        <i className="pi pi-phone text-primary"></i>
                                        <span>+1 234 567 890</span>
                                    </div>
                                    <div className="flex align-items-center gap-2">
                                        <i className="pi pi-envelope text-primary"></i>
                                        <span>contact@foodapp.com</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <form onSubmit={handleSubmit} className="flex flex-column gap-3">
                                    <div className="p-float-label">
                                        <InputText
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full"
                                            required
                                        />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="p-float-label">
                                        <InputText
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full"
                                            required
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="p-float-label">
                                        <InputText
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full"
                                        />
                                        <label htmlFor="phone">Phone (Optional)</label>
                                    </div>
                                    <div className="p-float-label">
                                        <Calendar
                                            id="preferredDate"
                                            name="preferredDate"
                                            value={formData.preferredDate}
                                            onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.value }))}
                                            className="w-full"
                                            placeholder="Preferred Contact Date"
                                            showIcon
                                        />
                                    </div>
                                    <div className="flex flex-column gap-2">
                                        <label>How would you rate our service?</label>
                                        <Rating
                                            value={formData.rating}
                                            onChange={(e) => setFormData(prev => ({ ...prev, rating: e.value }))}
                                            cancel={false}
                                        />
                                    </div>
                                    <div className="p-float-label">
                                        <InputTextarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full"
                                            rows={4}
                                            required
                                        />
                                        <label htmlFor="message">Message</label>
                                    </div>
                                    <Button
                                        type="submit"
                                        label="Send Message"
                                        icon="pi pi-send"
                                        className="p-button-primary"
                                    />
                                </form>
                            </div>
                        </div>
                    </Card>

                    <Card title="Frequently Asked Questions" className="mt-4">
                        <div className="flex flex-column gap-3">
                            <div>
                                <h3 className="text-lg font-bold">How can I track my order?</h3>
                                <p className="text-500">You can track your order through our mobile app or website using your order ID.</p>
                            </div>
                            <Divider />
                            <div>
                                <h3 className="text-lg font-bold">What are your delivery hours?</h3>
                                <p className="text-500">We deliver from 10 AM to 10 PM, seven days a week.</p>
                            </div>
                            <Divider />
                            <div>
                                <h3 className="text-lg font-bold">Do you offer catering services?</h3>
                                <p className="text-500">Yes, we provide catering services for events. Please contact us for more details.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Contact;