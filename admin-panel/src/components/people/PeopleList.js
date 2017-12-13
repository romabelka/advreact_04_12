import React from 'react'

export default ({list}) =>
      <div>
        <h2>People</h2>
        <div>
          <div>Id. Email Имя Фамилия</div>
          {list.map((p, idx) => (
            <div key={p.id}>
              {idx}. {p.email} {p.firstName} {p.lastName}
            </div>
          ))}
        </div>
      </div>
