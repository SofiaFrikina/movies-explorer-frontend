import React from 'react';
import { Link } from 'react-router-dom';

function PageError() {
    return (
        <main className="page-error">
            <section className="page-error__container">
                <h1 className="page-error__title">404</h1>
                <h2 className="page-error__subtitle">Страница не найдена</h2>
                <Link to={-1} className="page-error__back">Назад</Link>
            </section>
        </main>
    )
}

export default PageError;