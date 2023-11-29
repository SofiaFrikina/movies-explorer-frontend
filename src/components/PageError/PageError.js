import React from 'react';
import { Link } from 'react-router-dom';

function PageError() {
    return (
        <section className="page-error">
            <div className="page-error__container">
                <h1 className="page-error__title">404</h1>
                <h2 className="page-error__subtitle">Страница не найдена</h2>
                <Link to={-1} className="page-error__back">Назад</Link>
            </div>
        </section>
    )
}

export default PageError;