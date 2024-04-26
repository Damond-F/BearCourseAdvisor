import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './graph.css';

function Graph({ gradeDistribution }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Define the desired order of grade labels
  const orderedGradeLabels = [
    'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F', 'P', 'NP'
  ];

  // Mapping of grade keys to display labels
  const gradeLabelMap = {
    A_plus: 'A+',
    A_minus: 'A-',
    B_plus: 'B+',
    B_minus: 'B-',
    C_plus: 'C+',
    C_minus: 'C-',
    // Add any other mappings as necessary
  };

  useEffect(() => {
    if (!gradeDistribution || !canvasRef.current) {
      return; // Exit if no gradeDistribution data or if canvas isn't ready
    }

    // Transform gradeDistribution keys to their display labels
    const transformedGrades = Object.keys(gradeDistribution).reduce((acc, key) => {
      const newKey = gradeLabelMap[key] || key;
      acc[newKey] = gradeDistribution[key];
      return acc;
    }, {});

    // Filter and sort the labels based on the defined order
    const sortedLabels = orderedGradeLabels.filter(label => label in transformedGrades);
    const sortedData = sortedLabels.map(label => transformedGrades[label]);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const maxValue = Math.max(...sortedData);
    const roundedMaxValue = Math.ceil(maxValue / 0.05) * 0.05; // Rounds up to the nearest 0.05

    chartRef.current = new Chart(canvasRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: sortedLabels,
        datasets: [{
          label: 'Grade Distribution',
          data: sortedData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: roundedMaxValue, // Use the calculated max value here
            ticks: {
              font: {
                size: 20 // Increase y-axis tick font size
              },
              // Other y-axis options...
            }
          },
          x: {
            ticks: {
              font: {
                size: 16 // Increase x-axis tick font size
              },
              // Other x-axis options...
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 18 // Increase legend label font size
              }
            }
          }
          // Other plugin options...
        }
        // Other chart options...
      }
    });

    // Cleanup function
    return () => chartRef.current?.destroy();
  }, [gradeDistribution]);

  return (
    <div className="graph-container">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default Graph;