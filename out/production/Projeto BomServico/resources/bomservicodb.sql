--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10
-- Dumped by pg_dump version 16.2

-- Started on 2025-10-22 19:58:37

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

--
-- TOC entry 203 (class 1259 OID 238543)
-- Name: anu_cat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anu_cat (
    ac_id integer NOT NULL,
    anu_id integer,
    cat_id integer
);


ALTER TABLE public.anu_cat OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 238546)
-- Name: anu_cat_ac_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.anu_cat_ac_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.anu_cat_ac_id_seq OWNER TO postgres;

--
-- TOC entry 2859 (class 0 OID 0)
-- Dependencies: 204
-- Name: anu_cat_ac_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.anu_cat_ac_id_seq OWNED BY public.anu_cat.ac_id;


--
-- TOC entry 196 (class 1259 OID 44199)
-- Name: anuncio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anuncio (
    anu_id integer NOT NULL,
    usu_login character varying(14) NOT NULL,
    anu_titulo character varying(30) NOT NULL,
    anu_descricao character varying(200),
    anu_diastrabalho character varying(30) NOT NULL,
    anu_horarioinicio character varying(5) NOT NULL,
    anu_horariofim character varying(5) NOT NULL
);


ALTER TABLE public.anuncio OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 44202)
-- Name: anuncio_anu_cod_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.anuncio_anu_cod_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.anuncio_anu_cod_seq OWNER TO postgres;

--
-- TOC entry 2860 (class 0 OID 0)
-- Dependencies: 197
-- Name: anuncio_anu_cod_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.anuncio_anu_cod_seq OWNED BY public.anuncio.anu_id;


--
-- TOC entry 198 (class 1259 OID 44204)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    cat_id integer NOT NULL,
    cat_nome character varying(30) NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 44207)
-- Name: categoria_cat_cod_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_cat_cod_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categoria_cat_cod_seq OWNER TO postgres;

--
-- TOC entry 2861 (class 0 OID 0)
-- Dependencies: 199
-- Name: categoria_cat_cod_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_cat_cod_seq OWNED BY public.categoria.cat_id;


--
-- TOC entry 200 (class 1259 OID 44209)
-- Name: foto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foto (
    fot_id integer NOT NULL,
    anu_id integer NOT NULL,
    fot_file character varying(200) NOT NULL
);


ALTER TABLE public.foto OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 44212)
-- Name: foto_fot_cod_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.foto_fot_cod_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.foto_fot_cod_seq OWNER TO postgres;

--
-- TOC entry 2862 (class 0 OID 0)
-- Dependencies: 201
-- Name: foto_fot_cod_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.foto_fot_cod_seq OWNED BY public.foto.fot_id;


--
-- TOC entry 206 (class 1259 OID 238571)
-- Name: interesse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interesse (
    int_id integer NOT NULL,
    int_nome character varying(45),
    int_fone character varying(14),
    int_email character varying(40),
    int_mensagem text,
    anu_id integer
);


ALTER TABLE public.interesse OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 238569)
-- Name: interesse_int_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.interesse_int_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.interesse_int_id_seq OWNER TO postgres;

--
-- TOC entry 2863 (class 0 OID 0)
-- Dependencies: 205
-- Name: interesse_int_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.interesse_int_id_seq OWNED BY public.interesse.int_id;


--
-- TOC entry 202 (class 1259 OID 44227)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    usu_login character varying(16) NOT NULL,
    usu_senha character varying(32) NOT NULL,
    usu_nivel integer NOT NULL,
    usu_nome character varying(50) NOT NULL,
    usu_cpf character varying(14),
    usu_dtnascimento date,
    usu_email character varying(50),
    usu_telefone character varying(14),
    usu_endereco character varying(50)
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 2702 (class 2604 OID 238548)
-- Name: anu_cat ac_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anu_cat ALTER COLUMN ac_id SET DEFAULT nextval('public.anu_cat_ac_id_seq'::regclass);


--
-- TOC entry 2699 (class 2604 OID 44230)
-- Name: anuncio anu_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anuncio ALTER COLUMN anu_id SET DEFAULT nextval('public.anuncio_anu_cod_seq'::regclass);


--
-- TOC entry 2700 (class 2604 OID 44231)
-- Name: categoria cat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN cat_id SET DEFAULT nextval('public.categoria_cat_cod_seq'::regclass);


--
-- TOC entry 2701 (class 2604 OID 44232)
-- Name: foto fot_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto ALTER COLUMN fot_id SET DEFAULT nextval('public.foto_fot_cod_seq'::regclass);


--
-- TOC entry 2703 (class 2604 OID 238574)
-- Name: interesse int_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interesse ALTER COLUMN int_id SET DEFAULT nextval('public.interesse_int_id_seq'::regclass);


--
-- TOC entry 2849 (class 0 OID 238543)
-- Dependencies: 203
-- Data for Name: anu_cat; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2842 (class 0 OID 44199)
-- Dependencies: 196
-- Data for Name: anuncio; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.anuncio VALUES (1, 'jorge', 'Servicos do Jorge', 'Servicos gerais para manutencao de sua casa', 'Segunda - Sexta', '09:00', '12:00');
INSERT INTO public.anuncio VALUES (2, 'eddy', 'Pijama Micros', 'Fazemos manutencao de micros computadores', 'Domingo - Doming', '06:00', '05:00');
INSERT INTO public.anuncio VALUES (3, 'eddy', 'Criacao de sites', 'Sites de otimas qualidades, so vem!', 'seg - sab', '10:00', '18:00');
INSERT INTO public.anuncio VALUES (5, 'evandro', 'EJ Designer', 'Criacao e edicao de banners e imagens', 'seg - sex', '08:00', '17:00');


--
-- TOC entry 2844 (class 0 OID 44204)
-- Dependencies: 198
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categoria VALUES (1, 'Reparos');
INSERT INTO public.categoria VALUES (2, 'Transporte');
INSERT INTO public.categoria VALUES (3, 'Culinaria');
INSERT INTO public.categoria VALUES (4, 'Criacao');
INSERT INTO public.categoria VALUES (5, 'Video');
INSERT INTO public.categoria VALUES (6, 'Imagem');
INSERT INTO public.categoria VALUES (7, 'Audiovisual');


--
-- TOC entry 2846 (class 0 OID 44209)
-- Dependencies: 200
-- Data for Name: foto; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2852 (class 0 OID 238571)
-- Dependencies: 206
-- Data for Name: interesse; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2848 (class 0 OID 44227)
-- Dependencies: 202
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuario VALUES ('jorge', '123', 0, 'Jorge Augusto', '453.238.456-99', '1999-02-10', 'jorge@gmail.com', '(18)99105-8146', 'Rua dos Almirantes,999 - Sonho');
INSERT INTO public.usuario VALUES ('admin', 'admin', 1, 'Evandro Junior', '453.265.128-07', '1999-02-10', 'ecsb.junior@gmail.com', '(18)99182-3034', 'Rua Enio Pepino,831 - Parque Augusto Pereira');
INSERT INTO public.usuario VALUES ('eddy', 'eddy123', 0, 'Eddy da Silva', '449.887.556-08', '1999-10-10', 'eddy@gmail.com', '(18)99182-6459', 'Rua Ed,2 - Fipp');
INSERT INTO public.usuario VALUES ('evandro', 'evandro', 1, 'Evandro Junior Filho', '453.265.128-07', '1999-02-10', 'evandro@gmail.com', '(18)99182-3034', 'Rua Enio Pepino,831 - Parque Augusto Pereira');


--
-- TOC entry 2864 (class 0 OID 0)
-- Dependencies: 204
-- Name: anu_cat_ac_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.anu_cat_ac_id_seq', 1, false);


--
-- TOC entry 2865 (class 0 OID 0)
-- Dependencies: 197
-- Name: anuncio_anu_cod_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.anuncio_anu_cod_seq', 7, true);


--
-- TOC entry 2866 (class 0 OID 0)
-- Dependencies: 199
-- Name: categoria_cat_cod_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_cat_cod_seq', 9, true);


--
-- TOC entry 2867 (class 0 OID 0)
-- Dependencies: 201
-- Name: foto_fot_cod_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.foto_fot_cod_seq', 148, true);


--
-- TOC entry 2868 (class 0 OID 0)
-- Dependencies: 205
-- Name: interesse_int_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.interesse_int_id_seq', 1, false);


--
-- TOC entry 2713 (class 2606 OID 238553)
-- Name: anu_cat anu_cat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anu_cat
    ADD CONSTRAINT anu_cat_pkey PRIMARY KEY (ac_id);


--
-- TOC entry 2715 (class 2606 OID 238579)
-- Name: interesse interesse_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interesse
    ADD CONSTRAINT interesse_pkey PRIMARY KEY (int_id);


--
-- TOC entry 2705 (class 2606 OID 44236)
-- Name: anuncio pk_anu; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anuncio
    ADD CONSTRAINT pk_anu PRIMARY KEY (anu_id);


--
-- TOC entry 2707 (class 2606 OID 44238)
-- Name: categoria pk_cat; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT pk_cat PRIMARY KEY (cat_id);


--
-- TOC entry 2709 (class 2606 OID 44240)
-- Name: foto pk_foto; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT pk_foto PRIMARY KEY (fot_id);


--
-- TOC entry 2711 (class 2606 OID 44246)
-- Name: usuario pk_usu; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT pk_usu PRIMARY KEY (usu_login);


--
-- TOC entry 2718 (class 2606 OID 238554)
-- Name: anu_cat anu_cat_anu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anu_cat
    ADD CONSTRAINT anu_cat_anu_id_fkey FOREIGN KEY (anu_id) REFERENCES public.anuncio(anu_id) NOT VALID;


--
-- TOC entry 2719 (class 2606 OID 238559)
-- Name: anu_cat anu_cat_cat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anu_cat
    ADD CONSTRAINT anu_cat_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES public.categoria(cat_id) NOT VALID;


--
-- TOC entry 2716 (class 2606 OID 44252)
-- Name: anuncio fk_anusu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anuncio
    ADD CONSTRAINT fk_anusu FOREIGN KEY (usu_login) REFERENCES public.usuario(usu_login);


--
-- TOC entry 2717 (class 2606 OID 238564)
-- Name: foto foto_anu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT foto_anu_id_fkey FOREIGN KEY (anu_id) REFERENCES public.anuncio(anu_id) NOT VALID;


--
-- TOC entry 2720 (class 2606 OID 238580)
-- Name: interesse interesse_anu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interesse
    ADD CONSTRAINT interesse_anu_id_fkey FOREIGN KEY (anu_id) REFERENCES public.anuncio(anu_id) NOT VALID;


--
-- TOC entry 2858 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2025-10-22 19:58:38

--
-- PostgreSQL database dump complete
--

