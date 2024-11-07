// Testimonials.js
const Testimonials = () => {
    const testimonialsData = [
        {
            id: 1,
            name: "John Doe",
            feedback: "This platform has been a game-changer for our team. The UI is clean and easy to navigate!",
            position: "Product Manager"
        },
        {
            id: 2,
            name: "Jane Smith",
            feedback: "I love how seamless everything is. The features have saved us so much time!",
            position: "Software Engineer"
        },
        {
            id: 3,
            name: "Alex Johnson",
            feedback: "Fantastic experience! The support team is responsive and the dashboard is very intuitive.",
            position: "CTO"
        }
    ];

    return (
        <div className="p-5 m-10 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
            <div className="space-y-4">
                {testimonialsData.map((testimonial) => (
                    <div key={testimonial.id} className="border-b pb-4">
                        <p className="text-lg italic">"{testimonial.feedback}"</p>
                        <p className="text-sm font-semibold mt-2">{testimonial.name}</p>
                        <p className="text-xs text-gray-600">{testimonial.position}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
