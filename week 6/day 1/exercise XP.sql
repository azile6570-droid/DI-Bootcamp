--
-- PostgreSQL database dump
--

\restrict BKpGif7YIT57F1XP3MmHbLuXphSOrFcbcVYx5g6b3J40UfQX0wR6WmvV37z0rEw

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-09-23 10:02:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16422)
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    items_id integer NOT NULL,
    item_name character varying(100) NOT NULL,
    price integer NOT NULL
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16421)
-- Name: customer_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customer_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customer_items_id_seq OWNER TO postgres;

--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 219
-- Name: customer_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customer_items_id_seq OWNED BY public.customer.items_id;


--
-- TOC entry 224 (class 1259 OID 16444)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16443)
-- Name: customers_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_customer_id_seq OWNER TO postgres;

--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 223
-- Name: customers_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;


--
-- TOC entry 222 (class 1259 OID 16432)
-- Name: item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item (
    items_id integer NOT NULL,
    item_name character varying(100) NOT NULL,
    price integer NOT NULL
);


ALTER TABLE public.item OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16431)
-- Name: item_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_items_id_seq OWNER TO postgres;

--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 221
-- Name: item_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_items_id_seq OWNED BY public.item.items_id;


--
-- TOC entry 4819 (class 2604 OID 16425)
-- Name: customer items_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer ALTER COLUMN items_id SET DEFAULT nextval('public.customer_items_id_seq'::regclass);


--
-- TOC entry 4821 (class 2604 OID 16447)
-- Name: customers customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);


--
-- TOC entry 4820 (class 2604 OID 16435)
-- Name: item items_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item ALTER COLUMN items_id SET DEFAULT nextval('public.item_items_id_seq'::regclass);


--
-- TOC entry 4976 (class 0 OID 16422)
-- Dependencies: 220
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer (items_id, item_name, price) FROM stdin;
\.


--
-- TOC entry 4980 (class 0 OID 16444)
-- Dependencies: 224
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (customer_id, first_name, last_name) FROM stdin;
1	Greg	Jones
2	Sandra	Jones
3	Scott	Scott
4	Trevor	Green
5	Melanie	Johnson
\.


--
-- TOC entry 4978 (class 0 OID 16432)
-- Dependencies: 222
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item (items_id, item_name, price) FROM stdin;
1	Small Desk	100
2	Large desk	300
3	Fan	80
\.


--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 219
-- Name: customer_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_items_id_seq', 1, false);


--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 223
-- Name: customers_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_customer_id_seq', 5, true);


--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 221
-- Name: item_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_items_id_seq', 3, true);


--
-- TOC entry 4823 (class 2606 OID 16430)
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (items_id);


--
-- TOC entry 4827 (class 2606 OID 16452)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- TOC entry 4825 (class 2606 OID 16440)
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (items_id);


-- Completed on 2026-09-23 10:02:33

--
-- PostgreSQL database dump complete
--

\unrestrict BKpGif7YIT57F1XP3MmHbLuXphSOrFcbcVYx5g6b3J40UfQX0wR6WmvV37z0rEw

