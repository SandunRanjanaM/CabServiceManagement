import jsPDF from 'jspdf';

const Report = ({ trips }) => {
    const sortedTrips = [...trips].sort((a, b) => a.Firstname.localeCompare(b.Firstname));

    const generateReport = (trip) => {
            const doc = new jsPDF();
            const y = 10;
            doc.text(`Firstname: ${trip.Firstname}`, 10, y);
            doc.text(`Lastname: ${trip.Lastname}`, 10, y + 10);
            doc.text(`Address: ${trip.Address}`, 10, y + 20);
            doc.text(`ContactNo: ${trip.ContactNo}`, 10, y + 30);
            doc.text(`Destination: ${trip.Destination}`, 10, y + 40);
            doc.text(`VisitingPlaces: ${trip.VisitingPlaces}`, 10, y + 50);
            doc.text(`NumberOfPassengers: ${trip.NumberOfPassengers}`, 10, y + 60);
            doc.text(`VehicleType: ${trip.VehicleType}`, 10, y + 70);
            doc.text(`Date: ${trip.date}`, 10, y + 80);
            doc.text(`Time: ${trip.time}`, 10, y + 90);
            doc.text(`Distance: ${trip.distance}`, 10, y + 100);
            if (trip.payment) {
                doc.text(`Payment Amount: ${trip.payment.amount}`, 10, y + 110);
                doc.text(`Distance Traveled: ${trip.payment.distance}`, 10, y + 120);
            }
    
        doc.save(`${trip.Firstname}_Report.pdf`);
    };

    return (
        <div>
            {sortedTrips.map((trip, index) => (
                <button key={index} onClick={() => generateReport(trip)}>
                    Generate PDF Report for {trip.Firstname}
                    </button>
            ))}
        </div>
    );
};
export default Report;