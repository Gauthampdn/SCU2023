import React, { useState, useRef, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import './HomePage.css';
import { useAuthContext } from "../hooks/useAuthContext";
import NavBar from './NavBar';
import { useLogout } from "../hooks/useLogout";



const startIcon = new L.Icon({
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const endIcon = new L.Icon({
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const passengerIcon = new L.Icon({
  iconUrl: './Pin-location.png',
  iconSize: [50, 50],
  iconAnchor: [25, 41],
  popupAnchor: [1, -34],
});

const DraggableMarker = ({ content, initialPosition, onDrag }) => {
  const [position, setPosition] = useState(initialPosition);
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = ref.current;
      if (marker != null) {
        const newPos = marker.getLatLng();
        setPosition(newPos);
        onDrag(newPos);
      }
    },
  }), [onDrag]);
  const ref = useRef(null);
  return position ? (
    <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={ref}>
      <Popup>{content}</Popup>
    </Marker>
  ) : null;
};

const HomePage = () => {
  const { user, dispatch } = useAuthContext();

  const defaultStartCenter = { lat: user.start.lat.$numberDecimal, lng: user.start.lng.$numberDecimal };
  const defaultEndCenter = { lat: user.end.lat.$numberDecimal, lng: user.end.lng.$numberDecimal };
  const [startPosition, setStartPosition] = useState(defaultStartCenter);
  const [endPosition, setEndPosition] = useState(defaultEndCenter);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState('');
  const [processedCoordinates, setProcessedCoordinates] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [selectedPassengerId, setSelectedPassengerId] = useState(null);
  const [miles, setMiles] = useState(0);
  const [showEmissions, setShowEmissions] = useState(false);
  const [showEmissionsPage, setShowEmissionsPage] = useState(false);
  const [userName, setUserName] = useState(""); // State to store the fetched name
  const [showDriverInfo, setShowDriverInfo] = useState(false);
const [driverName, setDriverName] = useState('');


  // Function to handle the fetch operation
  const fetchUserName = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/person/driver/${user._id}`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      
      console.log("hi", data)
      setUserName(data[0].name); // Updating the state with the fetched name
      setDriverName(data[0].name); // Assuming the response has a 'name' field
      setShowDriverInfo(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };






  const handleNextClick = () => {
    setShowEmissions(true); // Show the emissions information
    const emissionsSaved = 0.404 * miles;
    console.log(`Emissions saved: ${emissionsSaved} kg CO2`);
    setShowEmissionsPage(true);

  };

  const handlePassengerClick = async () => {
    setShowForm(true);
    const response = await fetch(`http://localhost:4000/api/person/${user._id}`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "passenger",
      })
    });
  };


  const fetchPassengersData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/person/passengers", {
        credentials: 'include',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }); if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
      console.log(response)
    } catch (error) {
      console.error('Error:', error);
    }
  };


  function flipArrayValues(array) {
    return array.map(subArray => {
      if (Array.isArray(subArray) && subArray.length === 2) {
        return [subArray[1], subArray[0]];
      }
      return subArray;
    });
  }

  const handlePassengerCardClick = async (passenger) => {
    setSelectedPassengerId(passenger._id);
    try {
      const payload = {
        userStart: startPosition,
        userEnd: endPosition,
        passengerStart: { lat: passenger.start.lat.$numberDecimal, lng: passenger.start.lng.$numberDecimal },
        passengerEnd: { lat: passenger.end.lat.$numberDecimal, lng: passenger.end.lng.$numberDecimal }
      };

      const response = await fetch('http://localhost:4000/api/data/driver', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }


      const data = await response.json();
      const originalCoordinates = data.result.trip.routes[0].points.coordinates;
      setMiles(data.result.trip.routes[0].totalDistance)
      console.log("num of miles = ", data.result.trip.routes[0].totalDistance)
      const flippedCoordinates = flipArrayValues(originalCoordinates);

      setProcessedCoordinates(flippedCoordinates);
      console.log(flippedCoordinates); // Use processedCoordinates as needed
    } catch (error) {
      console.error('Error:', error);
    }

  };


  const handleDriverClick = async () => {

    const response = await fetch(`http://localhost:4000/api/person/${user._id}`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "driver" })
    });


    try {
      const payload = {
        start: startPosition,
        end: endPosition
      };

      const response = await fetch('http://localhost:4000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const originalCoordinates = data.result.trip.routes[0].points.coordinates;

      const flippedCoordinates = flipArrayValues(originalCoordinates);

      setProcessedCoordinates(flippedCoordinates);
      console.log(flippedCoordinates); // Use processedCoordinates as needed

    } catch (error) {
      console.error('Error:', error);
    }

    const passengersData = await fetchPassengersData();
    setPassengers(passengersData);

  };


  const handleContinue = async () => {
    setLoading(true);


    try {
      const payload = {
        start: startPosition,
        end: endPosition
      };

      const response = await fetch('http://localhost:4000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });


      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const originalCoordinates = data.result.trip.routes[0].points.coordinates;

      const flippedCoordinates = flipArrayValues(originalCoordinates);

      setProcessedCoordinates(flippedCoordinates);
      console.log(flippedCoordinates); // Use processedCoordinates as needed

    } catch (error) {
      console.error('Error:', error);
    }


  };

  const handleCancel = () => {
    setShowForm(false);
    setPrice('');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    setSelectedPassengerId(null);
  };

  const colorOp = { color: 'lime' }


  const updateStartPosition = async (newPosition) => {
    console.log(newPosition);

    setStartPosition(newPosition);

    const response = await fetch(`http://localhost:4000/api/person/${user._id}`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start: newPosition })
    });

    if (response.ok) {
      const updated = await response.json();
      dispatch({ type: "LOGIN", payload: updated })
    }
  };

  const updateEndPosition = async (newPosition) => {
    console.log(newPosition);
    setEndPosition(newPosition);

    const response = await fetch(`http://localhost:4000/api/person/${user._id}`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ end: newPosition })
    });

    if (response.ok) {
      const updated = await response.json();
      dispatch({ type: "LOGIN", payload: updated })
    }
  };



  const handleAccept = async (e, passengerId) => {

    try {
      const response = await fetch(`http://localhost:4000/api/person/${user._id}`, {
        credentials: 'include',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ looking: passengerId }) // Assuming you want to set 'looking' to false
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle successful response
      console.log("Passenger accepted successfully");
      // You might want to update the UI or state here
    } catch (error) {
      console.error('Error:', error);
    }


  }


  const handleDecline = (e, passengerId) => {
    e.stopPropagation(); // Prevent triggering card click

    // Filter out the declined passenger from the passengers array
    setPassengers(prevPassengers => prevPassengers.filter(passenger => passenger._id !== passengerId));
  };

  const { logout } = useLogout()
  const handleLogout = () => {
    logout()
  }
  return (
    
    <div className='Driver'>
      <div className="pull-tab" onClick={toggleSidebar}>Click Me</div>
      <div className="instructions">
        Pick Start/End Point
      </div>

      <MapContainer center={[user.start.lat.$numberDecimal, user.start.lng.$numberDecimal]} zoom={13} style={{ height: '100vh', width: '100vw' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DraggableMarker content="Start Point" initialPosition={startPosition} onDrag={updateStartPosition} icon={startIcon} />
        <DraggableMarker content="End Point" initialPosition={endPosition} onDrag={updateEndPosition} icon={endIcon} />
        {passengers.map(passenger => (
          selectedPassengerId === passenger._id && (
            <Marker
              key={passenger._id}
              position={[passenger.start.lat.$numberDecimal, passenger.start.lng.$numberDecimal]}
              icon={passengerIcon}
            >
              <Marker
                key={passenger._id}
                position={[passenger.end.lat.$numberDecimal, passenger.end.lng.$numberDecimal]}
                icon={passengerIcon}
              ></Marker>
              <Popup>{passenger.name}</Popup>
            </Marker>
          )))}
        {processedCoordinates.length > 0 && <Polyline pathOptions={colorOp} positions={processedCoordinates} color="blue" />}
      </MapContainer>

      {sidebarVisible && (
        <div className="sidebar">
        <button onClick={handleLogout} className="logout-button">Logout</button>
        {showDriverInfo ? (
          <div className="driver-info">
            <p>Your driver {driverName} is on the way!</p>
          </div>
        ) : (
          <>
            {!showForm && passengers.length === 0 ? (
              <>
                <button className="sidebar-button driver" onClick={handleDriverClick}>Driver</button>
                <button className="sidebar-button passenger" onClick={handlePassengerClick}>Passenger</button>
              </>
            ) : null}
      
            {passengers.length > 0 && (
              <div className="passenger-cards-container">
                {passengers.map((passenger) => (
                  <div key={passenger._id} className="passenger-card" onClick={() => handlePassengerCardClick(passenger)}>
                    <div className="passenger-name">{passenger.name}</div>
                    <button className="accept-button" onClick={(e) => handleAccept(e, passenger._id)}>
                      Accept
                    </button>
                    <button className="decline-button" onClick={(e) => handleDecline(e, passenger._id)}>
                      Decline
                    </button>
                  </div>
                ))}
                <button className="next-button" onClick={handleNextClick}>
                  Next →
                </button>
              </div>
            )}
      
            {showForm && (
              <>
                {loading ? (
                  <div className="loading">
                    <span className="loading-text">Finding Drivers...</span>
                    <div className="dot-container">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                    <button className = "refresh-button" onClick={fetchUserName}>Refresh</button> {/* The added button */}
                    {userName && <p>{userName}</p>} {/* Displaying the fetched name */}
                  </div>
                ) : (
                  <>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Fare" defaultValue="0.00" />
                    <button className="continue-button" onClick={handleContinue}>Continue</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                  </>
                )}
              </>
            )}
      
            {showEmissionsPage && (
              <div className="emissions-saved">
                <img src="/earth.png" alt="Earth Logo" className="earth-logo" />
                <h2>Emissions Saved</h2>
                <p>{`You saved ${(0.404 * miles).toFixed(3)} kg CO2 by carpooling!`}</p>
                {/* Add icon and additional text as needed */}
              </div>
            )}
          </>
        )}
      </div>
      
      )}
    </div>
  );
};

export default HomePage;
