import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './graph.css'; // Import the CSS file

function Graph() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null); // Add a reference for the chart instance

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const gradeDistribution = {
      'A+': 0.07,
      'A': 0.17,
      'A-': 0.16,
      'B+': 0.2,
      'B': 0.19,
      'B-': 0.1,
      'C+': 0.04,
      'C': 0.02,
      'C-': 0.01,
      'D': 0.02,
      'F': 0.03,
      'P': 0.14,
      'NP': 0.04
    };

    const labels = Object.keys(gradeDistribution);
    const data = Object.values(gradeDistribution);

    // Check if chartRef.current is defined and destroy the chart instance if it exists
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    // Create a new Chart.js instance and store the reference
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Grade Distribution',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue color with transparency
          borderColor: 'rgba(54, 162, 235, 1)', // Blue color
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                family: 'Arial',
                weight: 'normal', // Make the axis labels bold
                size: 20 // Increase the font size of the axis labels
              }
            }
          },
          x: {
            ticks: {
              font: {
                family: 'Arial',
                weight: 'normal', // Make the axis labels bold
                size: 20 // Increase the font size of the axis labels
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              font: {
                family: 'Arial',
                weight:'bold', // Make the legend text bold
                size: 20 // Increase the font size of the legend text
              }
            }
          }
        },
        layout: {
          padding: {
            left: 20, // Adjust the left padding of the chart area
            right: 20, // Adjust the right padding of the chart area
            top: 20, // Adjust the top padding of the chart area
            bottom: 20 // Adjust the bottom padding of the chart area
          }
        }
      }
    });

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="graph-container"> {/* Add a class name for styling */}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default Graph;
