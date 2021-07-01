import React, { useState } from 'react';
import './App.css';

function CustomersRewards() {
  // Cada uno de los 3 arrays representa las ventas de un cliente
  const [customersSales] = useState(
    [
      [120, 30, 10, 50, 60, 70, 100, 150, 200, 250, 40, 120, 110],
      [55, 300, 65, 125, 100, 20, 130, 250, 75, 80, 95, 105, 5],
      [350, 85, 78, 83, 91, 111, 256, 789, 900, 1, 99, 150, 199],
    ]);

  // Calcular puntos por venta individual
  const calculatePointsPerSale = (amount) => {
    if (amount <= 50) {
      return 0;
    } else if (amount > 50 && amount <= 100) {
      return amount - 50;
    } else if (amount > 100) {
      return (amount - 100) * 2 + 50;
    }
  }

  // Calcular todos los puntos de un cliente
  const calculatePointsPerCustomer = (customer) => {
    return customer.reduce((accumulated, currentSale) => {
      return accumulated + calculatePointsPerSale(currentSale);
    }, 0);
  }

  // Calcular todos los puntos de todos los clientes
  const calculateAllPoints = () => {
    return customersSales.reduce((accumulated, currentCustomer) => {
      return accumulated + calculatePointsPerCustomer(currentCustomer);
    }, 0);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Sales during a three month period:</h3>
        <ul>
          {customersSales.map((customer, i) => {
            return (
              <li key={i} style={{ marginBottom: '35px' }}>
                {`Customer ${i + 1}`}
                <ul style={{ marginBottom: '15px' }}>
                  {customer.map((sale, i) => {
                    return <li key={i}>{`$${sale} (${calculatePointsPerSale(sale)} points)`}</li>;
                  })}
                </ul>
                {`Total: ${calculatePointsPerCustomer(customer)} points`}
              </li>
            );
          })}
        </ul>
        {`Grand total: ${calculateAllPoints()} points`}
      </header>
    </div>
  );
}

export default CustomersRewards;
