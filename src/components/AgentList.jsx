import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { appDB } from '../utils/firebase';

const AgentList = () => {
  // Define color scheme (unchanged from your setup)
  const colorScheme = {
    appColor: "#edff8d", // Light yellow
    darkGrey: "#212121", // Dark background
    darkGrey2: "#424242", // Modal and table background
  };

  // Get the location object from React Router
  const location = useLocation();

  // Define createdAgents using useMemo to memoize the value from location.state
  const createdAgents = useMemo(() => location.state?.createdAgents || [], [location.state]);

  // State for agents and password visibility
  const [agents, setAgents] = useState([]);
  const [showPasswords, setShowPasswords] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);

  // Load agents from Firestore when createdAgents changes
  useEffect(() => {
    const loadAgents = async () => {
      try {
        const querySnapshot = await getDocs(collection(appDB, 'AgentLogin'));
        const agentsData = querySnapshot.docs.map((doc) => {
          const agentData = doc.data();
          // Find if this agent was newly created in the session
          const createdAgent = createdAgents.find((ca) => ca.id === doc.id);
          return {
            id: doc.id,
            userId: agentData.userId,
            password: agentData.password || '********', // Get actual password from Firestore
            isNewlyCreated: !!createdAgent, // Flag to highlight new agents
          };
        });
        setAgents(agentsData);
      } catch (error) {
        console.error('Error loading agents:', error);
      }
    };
    loadAgents();
  }, [createdAgents]);

  // Toggle password visibility
  const togglePassword = (id) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Render the agent list
  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        backgroundColor: colorScheme.darkGrey,
        backgroundImage: 'linear-gradient(to right bottom, rgba(33, 33, 33, 0.9), rgba(66, 66, 66, 0.9))',
      }}
    >
      <div
        className="w-full max-w-4xl p-8 rounded-2xl shadow-2xl transition-all duration-500 ease-in-out"
        style={{
          backgroundColor: colorScheme.darkGrey2,
          border: `2px solid ${colorScheme.appColor}`,
          boxShadow: `0 0 30px ${colorScheme.appColor}55`,
        }}
      >
        <h2
          className="text-4xl font-bold text-center mb-8 transition-all duration-300"
          style={{ 
            color: colorScheme.appColor,
            textShadow: `0 0 10px ${colorScheme.appColor}88` 
          }}
        >
          Agent List
        </h2>
        
        <div className="overflow-hidden rounded-xl" style={{ 
          border: `1px solid ${colorScheme.appColor}66`,
          backgroundColor: `${colorScheme.darkGrey}66`
        }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th 
                  className="p-4 transition-all duration-200"
                  style={{ 
                    color: colorScheme.appColor,
                    borderBottom: `2px solid ${colorScheme.appColor}66`,
                    width: "50%"
                  }}
                >
                  User ID
                </th>
                <th 
                  className="p-4 transition-all duration-200"
                  style={{ 
                    color: colorScheme.appColor,
                    borderBottom: `2px solid ${colorScheme.appColor}66`,
                    width: "50%"
                  }}
                >
                  Password
                </th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr 
                  key={agent.id} 
                  className="transition-all duration-200"
                  style={{ 
                    color: colorScheme.appColor,
                    backgroundColor: hoveredRow === agent.id 
                      ? `${colorScheme.appColor}11` 
                      : agent.isNewlyCreated 
                        ? `${colorScheme.appColor}0a` 
                        : 'transparent'
                  }}
                  onMouseEnter={() => setHoveredRow(agent.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td 
                    className="p-4 transition-all duration-200"
                    style={{ borderBottom: `1px solid ${colorScheme.appColor}33` }}
                  >
                    <div className="flex items-center">
                      {agent.userId}
                      {agent.isNewlyCreated && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full" style={{
                          backgroundColor: `${colorScheme.appColor}33`,
                          color: colorScheme.appColor
                        }}>
                          New
                        </span>
                      )}
                    </div>
                  </td>
                  <td 
                    className="p-4 transition-all duration-200"
                    style={{ borderBottom: `1px solid ${colorScheme.appColor}33` }}
                  >
                    <div className="flex items-center justify-between">
                      <span 
                        className="transition-all duration-300"
                        style={{ 
                          fontFamily: 'monospace',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {showPasswords[agent.id] ? agent.password : '•••••••••'}
                      </span>
                      <button
                        onClick={() => togglePassword(agent.id)}
                        className="px-3 py-1 ml-4 rounded-md transition-all duration-300 transform hover:scale-105"
                        style={{ 
                          backgroundColor: `${colorScheme.appColor}22`,
                          border: `1px solid ${colorScheme.appColor}66`,
                          color: colorScheme.appColor,
                        }}
                      >
                        {showPasswords[agent.id] ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {agents.length === 0 && (
          <div 
            className="text-center p-6 mt-4 rounded-lg transition-all duration-300"
            style={{ 
              color: colorScheme.appColor,
              border: `1px dashed ${colorScheme.appColor}66`,
            }}
          >
            No agents found
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentList;