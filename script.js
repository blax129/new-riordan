(function () {
  const hamburger = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const applicationForm = document.querySelector("#application-form");
  const backButtons = Array.from(document.querySelectorAll(".back-button"));
  const communitySliders = Array.from(document.querySelectorAll("[data-community-slider]"));
  const languageSelects = Array.from(document.querySelectorAll(".language-select"));
  const languageSwitchers = Array.from(document.querySelectorAll(".language-switcher"));
  const revealTargets = Array.from(document.querySelectorAll(".hero-copy-block, .profile-image-card, .section-heading, .trust-pill, .manager-card, .copy-panel, .hoa-badge, .service-card, .process-list li, .community-slider, .faq-card, .accordion-item, .consultation-panel, .form-intro, fieldset, .confirmation-panel"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const urlLanguage = new URLSearchParams(window.location.search).get("lang");
  const savedLanguage = window.localStorage.getItem("site-language");
  const pageLanguage = document.documentElement.lang && document.documentElement.lang.indexOf("es") === 0 ? "es" : "en";
  const defaultLanguage = urlLanguage || (pageLanguage === "es" ? pageLanguage : savedLanguage) || pageLanguage || "en";

  const translations = {
    es: {
      "Private Property Manager": "Administradora Privada de Propiedades",
      "Open navigation": "Abrir navegación",
      "Main navigation": "Navegación principal",
      "Language": "Idioma",
      "Navigation": "Navegación",
      "Home": "Inicio",
      "About": "Acerca de",
      "Services": "Servicios",
      "Gallery": "Galería",
      "Rental Process": "Proceso de alquiler",
      "FAQ": "Preguntas",
      "Contact": "Contacto",
      "Request Consultation": "Solicitar consulta",
      "Apply Now": "Aplicar Ahora",
      "Back": "Volver",
      "Private property management": "Administración privada de propiedades",
      "Professional and transparent rental coordination for applicants": "Coordinación de alquiler profesional y transparente para solicitantes",
      "Professional Photo Coming Soon": "Foto profesional próximamente",
      "Professional rental support designed to make the leasing process organized, transparent, and efficient.": "Apoyo profesional de alquiler diseñado para que el proceso de arrendamiento sea organizado, transparente y eficiente.",
      "Tenant Screening & Application Review": "Revisión de solicitudes y evaluación de inquilinos",
      "Rental Listing & Marketing Support": "Apoyo de publicación y marketing de alquileres",
      "Lease Coordination": "Coordinación de contrato de arrendamiento",
      "Scheduling Property Tours": "Programación de visitas a la propiedad",
      "Managing Rental Inquiries & Tenant Communication": "Gestión de consultas de alquiler y comunicación con inquilinos",
      "Guiding Applicants Through The Approval Process": "Guía para solicitantes durante el proceso de aprobación",
      "Lifestyle gallery": "Galería de estilo de vida",
      "Community & Moments": "Comunidad y momentos",
      "A closer look at the lifestyle, comfort, and community experience.": "Una mirada más cercana al estilo de vida, la comodidad y la experiencia comunitaria.",
      "Previous image": "Imagen anterior",
      "Next image": "Imagen siguiente",
      "Gallery navigation": "Navegación de galería",
      "Privately managed rentals": "Alquileres administrados de forma privada",
      "Quality rental homes with a simple and transparent application process.": "Viviendas de alquiler de calidad con un proceso de solicitud simple y transparente.",
      "Katherine Riordan offers privately managed rental homes focused on transparency, responsive communication, and a smooth leasing experience.": "Katherine Riordan ofrece viviendas de alquiler administradas de forma privada, con enfoque en transparencia, comunicación receptiva y una experiencia de arrendamiento fluida.",
      "Secure Application Processing": "Procesamiento seguro de solicitudes",
      "Applications are securely processed through Zillow Rental Manager in partnership with the property owner.": "Las solicitudes se procesan de forma segura mediante Zillow Rental Manager en colaboración con la propietaria.",
      "About Katherine": "Acerca de Katherine",
      "Private rental management with direct owner oversight.": "Administración privada de alquileres con supervisión directa de la propietaria.",
      "Katherine Riordan is a dedicated private property manager focused on providing organized, transparent, and professional rental support for both property owners and prospective tenants.": "Katherine Riordan es una administradora privada de propiedades dedicada a brindar apoyo de alquiler organizado, transparente y profesional tanto para propietarios como para posibles inquilinos.",
      "She works closely with applicants throughout the leasing process, helping them understand application requirements, schedule property tours, and navigate each step with clarity and confidence.": "Trabaja de cerca con los solicitantes durante todo el proceso de arrendamiento, ayudándoles a comprender los requisitos de solicitud, programar visitas a la propiedad y avanzar en cada paso con claridad y confianza.",
      "With a strong emphasis on communication, reliability, and professionalism, Katherine is committed to creating a rental experience that feels smooth, well-structured, and respectful for everyone involved.": "Con un fuerte énfasis en la comunicación, la confiabilidad y el profesionalismo, Katherine se compromete a crear una experiencia de alquiler fluida, bien estructurada y respetuosa para todos los involucrados.",
      "Her approach is centered around responsive communication, transparent expectations, and making the rental process as straightforward and stress-free as possible.": "Su enfoque se centra en la comunicación receptiva, expectativas transparentes y hacer que el proceso de alquiler sea lo más sencillo y libre de estrés posible.",
      "HOA Logo": "Logo HOA",
      "Community & HOA Guidelines Respected": "Se respetan las pautas de la comunidad y la HOA",
      "Managed in alignment with community standards": "Administrado en alineación con los estándares de la comunidad",
      "Rental process": "Proceso de alquiler",
      "Simple next steps": "Siguientes pasos simples",
      "View Property Details": "Ver detalles de la propiedad",
      "Review available property information before applying.": "Revise la información disponible de la propiedad antes de aplicar.",
      "Submit Application": "Enviar Solicitud",
      "Complete the secure rental application form.": "Complete el formulario seguro de solicitud de alquiler.",
      "Refundable Application Fee": "Tarifa de solicitud reembolsable",
      "Application fees are refundable if the application is not approved or the applicant chooses not to move forward after the tour.": "Las tarifas de solicitud son reembolsables si la solicitud no es aprobada o si el solicitante decide no continuar después de la visita.",
      "Next Steps": "Siguientes pasos",
      "Qualified applicants will receive updates, tour scheduling, and further instructions.": "Los solicitantes calificados recibirán actualizaciones, programación de visita e instrucciones adicionales.",
      "Rental application questions": "Preguntas sobre la solicitud de alquiler",
      "How do I apply for a rental?": "¿Cómo aplico para un alquiler?",
      "You can apply directly through the secure rental application form on this website.": "Puede aplicar directamente mediante el formulario seguro de solicitud de alquiler en este sitio web.",
      "Is there an application fee?": "¿Hay una tarifa de solicitud?",
      "Yes. A refundable application fee may apply after submitting the application.": "Sí. Puede aplicarse una tarifa de solicitud reembolsable después de enviar la solicitud.",
      "Are listings always available?": "¿Los listados siempre están disponibles?",
      "Availability may change at any time depending on current occupancy and application status.": "La disponibilidad puede cambiar en cualquier momento según la ocupación actual y el estado de las solicitudes.",
      "How will I be contacted?": "¿Cómo me contactarán?",
      "Applicants are typically contacted using the phone number or email provided in the application form.": "Normalmente se contacta a los solicitantes usando el número de teléfono o correo electrónico proporcionado en el formulario.",
      "Request guidance regarding availability, application steps, move-in timing, or general rental questions before proceeding.": "Solicite orientación sobre disponibilidad, pasos de la solicitud, calendario de mudanza u otras consultas relacionadas con el alquiler antes de continuar.",
      "Property Manager": "Administradora de propiedades",
      "Direct Contact": "Contacto directo",
      "For rental inquiries or application support, contact Katherine directly.": "Para consultas sobre alquiler o apoyo con su solicitud, comuníquese directamente con Katherine.",
      "If you have questions regarding the application process, please contact Katherine Riordan directly.": "Si tiene preguntas sobre el proceso de solicitud, comuníquese directamente con Katherine Riordan.",
      "Email Katherine Riordan": "Enviar correo electrónico a Katherine Riordan",
      "Call Katherine Riordan": "Llamar a Katherine Riordan",
      "© 2026 Katherine Riordan. Privately managed rentals.": "© 2026 Katherine Riordan. Alquileres administrados de forma privada.",
      "Secure rental application": "Solicitud segura de alquiler",
      "Rental Application Form": "Formulario de Solicitud de Alquiler",
      "Please complete this form accurately. All information provided will remain confidential and is required solely for the rental application approval process. Each adult (18+) applying to live in the unit must complete a separate application.": "Complete este formulario con precisión. Toda la información proporcionada permanecerá confidencial y se requiere únicamente para el proceso de aprobación de la solicitud de alquiler. Cada adulto (18+) que solicite vivir en la unidad debe completar una solicitud por separado.",
      "This is a privately managed rental. All applications are reviewed directly by the property owner. No third-party agents are involved.": "Este es un alquiler administrado de forma privada. Todas las solicitudes son revisadas directamente por la propietaria. No participan agentes externos.",
      "This is a privately managed rental. All applications are reviewed directly by the property owner.": "Este es un alquiler administrado de forma privada. Todas las solicitudes son revisadas directamente por la propietaria.",
      "Equal Housing Opportunity": "Igualdad de oportunidad de vivienda",
      "Secure SSL Encrypted Application": "Solicitud segura con cifrado SSL",
      "Application Process Supported Through Zillow Rental Manager": "Proceso de solicitud respaldado mediante Zillow Rental Manager",
      "Applications are securely submitted through Zillow Rental Manager in partnership with the property owner. No outside leasing agents are involved.": "Las solicitudes se envían de forma segura mediante Zillow Rental Manager en colaboración con la propietaria. No participan agentes de arrendamiento externos.",
      "Property Information": "Información de la propiedad",
      "Property applying for": "Propiedad para la que aplica",
      "Enter property address or listing name": "Ingrese la dirección o el nombre del anuncio",
      "Select a property": "Seleccione una propiedad",
      "Desired move-in date": "Fecha deseada de mudanza",
      "Applicant Information": "Información del solicitante",
      "Full legal name": "Nombre legal completo",
      "Email address": "Correo electrónico",
      "Phone number": "Número de teléfono",
      "Date of birth": "Fecha de nacimiento",
      "Residency History": "Historial de residencia",
      "Current address": "Dirección actual",
      "Current landlord or manager": "Propietario o administrador actual",
      "Landlord phone number": "Teléfono del propietario o administrador",
      "How long have you lived there?": "¿Cuánto tiempo ha vivido ahí?",
      "Employment & Income": "Empleo e ingresos",
      "Employer or income source": "Empleador o fuente de ingresos",
      "Job title": "Puesto de trabajo",
      "Gross monthly income": "Ingreso mensual bruto",
      "Employer phone number": "Teléfono del empleador",
      "Employer name": "Nombre del empleador",
      "Enter employer or company name": "Ingrese el nombre del empleador o empresa",
      "Background Questions": "Preguntas de antecedentes",
      "Have you ever been evicted?": "¿Alguna vez ha sido desalojado?",
      "Select an answer": "Seleccione una respuesta",
      "No": "No",
      "Yes": "Sí",
      "Have you filed bankruptcy in the last 7 years?": "¿Ha declarado bancarrota en los últimos 7 años?",
      "If yes to any question, please explain": "Si respondió sí a alguna pregunta, explique",
      "Additional Information": "Información adicional",
      "Additional occupants": "Ocupantes adicionales",
      "Pets": "Mascotas",
      "Anything else you would like to share?": "¿Algo más que desee compartir?",
      "Emergency Contact": "Contacto de emergencia",
      "Emergency contact name": "Nombre del contacto de emergencia",
      "Emergency contact phone": "Teléfono del contacto de emergencia",
      "Relationship": "Relación",
      "Agreement": "Acuerdo",
      "I certify that the information provided is true and complete to the best of my knowledge.": "Certifico que la información proporcionada es verdadera y completa a mi leal saber y entender.",
      "Application received": "Solicitud recibida",
      "Thank you. Your application has been submitted.": "Gracias. Su solicitud ha sido enviada.",
      "Your application is marked as received. Please watch your email or phone for updates from Katherine about review status, tour scheduling, or next-step instructions.": "Su solicitud aparece como recibida. Revise su correo electrónico o teléfono para actualizaciones de Katherine sobre el estado de revisión, programación de visita o instrucciones de siguientes pasos.",
      "Status: Received": "Estado: Recibida",
      "Applications are reviewed directly by the property owner. You will be contacted if more information is needed.": "Las solicitudes son revisadas directamente por la propietaria. Se le contactará si se necesita más información.",
      "Secure processing note": "Nota de procesamiento seguro",
      "Application details may be processed through Zillow Rental Manager in partnership with the property owner.": "Los detalles de la solicitud pueden procesarse mediante Zillow Rental Manager en colaboración con la propietaria.",
      "Return Home": "Volver al inicio",
      "Contact Katherine": "Contactar a Katherine",
      "Example: 2 years": "Ejemplo: 2 años",
      "Names and relationship to applicant": "Nombres y relación con el solicitante",
      "Type, breed": "Tipo, raza",
      "Type, breed, weight, and age": "Tipo, raza, peso y edad",
      "Submitting...": "Enviando...",
      "Submitting securely...": "Enviando de forma segura...",
      "Application submitted. Redirecting...": "Solicitud enviada. Redirigiendo...",
      "Submitted. Redirecting...": "Enviada. Redirigiendo...",
      "Something went wrong. Please try again.": "Algo salió mal. Inténtelo nuevamente."
      ,
      "Submission Received": "Solicitud recibida",
      "Application Received Successfully": "Solicitud recibida correctamente",
      "Thank you for completing your rental application. Your information has been received successfully and is currently pending review.": "Gracias por completar su solicitud de alquiler. Su información se recibió correctamente y está pendiente de revisión.",
      "Application ID:": "ID de solicitud:",
      "Email Confirmation": "Confirmación por correo electrónico",
      "A confirmation email will be sent shortly to the email address provided in your application. That email will confirm that your application has been received.": "Pronto se enviará un correo de confirmación a la dirección proporcionada en su solicitud. Ese correo confirmará que su solicitud fue recibida.",
      "Secure & Verified Process": "Proceso seguro y verificado",
      "This application process is handled directly by the property management team. All submitted applications are reviewed carefully, and payment confirmations are documented for transparency and record keeping.": "Este proceso de solicitud es gestionado directamente por el equipo de administración de la propiedad. Todas las solicitudes enviadas se revisan cuidadosamente y las confirmaciones de pago se documentan para transparencia y registro.",
      "Fee Transparency": "Transparencia de tarifas",
      "The application fee is refundable if your application is not approved or if you decide not to proceed after the tour. If approved and you choose to move forward, the fee is applied toward your first month's rent.": "La tarifa de solicitud es reembolsable si su solicitud no es aprobada o si decide no continuar después de la visita. Si se aprueba y decide seguir adelante, la tarifa se aplica al primer mes de renta.",
      "Chime Payment Information": "Información de pago por Chime",
      "Payment Method:": "Método de pago:",
      "Account Name:": "Nombre de la cuenta:",
      "Chime Tag / Username:": "Etiqueta/usuario de Chime:",
      "Application Fee:": "Tarifa de solicitud:",
      "Reference Note:": "Nota de referencia:",
      "Provide a screenshot of the payment confirmation via email or text.": "Proporcione una captura de pantalla de la confirmación de pago por correo electrónico o mensaje de texto.",
      "Payment should be sent only through the official Chime information provided on this page. Keep your payment confirmation for your records.": "El pago debe enviarse únicamente mediante la información oficial de Chime proporcionada en esta página. Conserve su confirmación de pago para sus registros.",
      "I have completed the application fee payment": "He completado el pago de la tarifa de solicitud",
      "Continue To Payment Confirmation": "Continuar a la confirmación de pago",
      "Don't Have Chime?": "¿No tiene Chime?",
      "No problem. You can create a Chime account first, then return to complete the application fee payment using the official details above.": "No hay problema. Puede crear una cuenta de Chime primero y luego regresar para completar el pago usando los datos oficiales anteriores.",
      "Upload Payment Confirmation": "Subir confirmación de pago",
      "Please upload your payment screenshot to complete your secure application verification.": "Suba la captura de pantalla de su pago para completar la verificación segura de su solicitud.",
      "Applicant details": "Datos del solicitante",
      "Full Name": "Nombre completo",
      "Email Address": "Correo electrónico",
      "Application ID (optional)": "ID de solicitud (opcional)",
      "Tap to upload": "Toque para subir",
      "or drag and drop your payment screenshot here.": "o arrastre y suelte aquí la captura de pantalla del pago.",
      "JPG, JPEG or PNG only": "Solo JPG, JPEG o PNG",
      "Selected File": "Archivo seleccionado",
      "Submit Payment Confirmation": "Enviar confirmación de pago",
      "Prefer Email Confirmation?": "¿Prefiere confirmar por correo?",
      "If you would prefer to email your payment confirmation instead, send it directly to Katherine for processing.": "Si prefiere enviar la confirmación de pago por correo, envíela directamente a Katherine para su procesamiento.",
      "Send Email Confirmation": "Enviar confirmación por correo",
      "Payment Confirmation Submitted": "Confirmación de pago enviada",
      "Your payment screenshot has been received and is pending private verification. Katherine will review your confirmation with your application details.": "Su captura de pantalla del pago fue recibida y está pendiente de verificación privada. Katherine revisará su confirmación junto con los detalles de su solicitud."
    },
    zh: {
      "Private Property Manager": "私人物业经理",
      "Open navigation": "打开导航",
      "Main navigation": "主导航",
      "Language": "语言",
      "Navigation": "导航",
      "Home": "首页",
      "About": "关于",
      "Services": "服务",
      "Gallery": "图库",
      "Rental Process": "租赁流程",
      "FAQ": "常见问题",
      "Contact": "联系",
      "Request Consultation": "申请咨询",
      "Apply Now": "立即申请",
      "Back": "返回",
      "Private property management": "私人物业管理",
      "Professional and transparent rental coordination for applicants": "面向申请人的专业透明租赁协调",
      "Professional Photo Coming Soon": "专业照片即将推出",
      "Professional rental support designed to make the leasing process organized, transparent, and efficient.": "专业租赁支持，旨在让租赁流程有序、透明且高效。",
      "Tenant Screening & Application Review": "租户筛选与申请审核",
      "Rental Listing & Marketing Support": "租赁房源发布与营销支持",
      "Lease Coordination": "租约协调",
      "Scheduling Property Tours": "安排房源参观",
      "Managing Rental Inquiries & Tenant Communication": "管理租赁咨询与租户沟通",
      "Guiding Applicants Through The Approval Process": "指导申请人完成审批流程",
      "Lifestyle gallery": "生活方式图库",
      "Community & Moments": "社区与时刻",
      "A closer look at the lifestyle, comfort, and community experience.": "近距离感受生活方式、舒适度与社区体验。",
      "Previous image": "上一张图片",
      "Next image": "下一张图片",
      "Gallery navigation": "图库导航",
      "Privately managed rentals": "私人管理租赁",
      "Quality rental homes with a simple and transparent application process.": "优质出租住宅，申请流程简单透明。",
      "Katherine Riordan offers privately managed rental homes focused on transparency, responsive communication, and a smooth leasing experience.": "Katherine Riordan 提供私人管理的出租住宅，注重透明沟通、及时回应和顺畅的租赁体验。",
      "Secure Application Processing": "安全申请处理",
      "Applications are securely processed through Zillow Rental Manager in partnership with the property owner.": "申请通过 Zillow Rental Manager 与业主合作进行安全处理。",
      "About Katherine": "关于 Katherine",
      "Private rental management with direct owner oversight.": "由业主直接监督的私人租赁管理。",
      "Katherine Riordan is a dedicated private property manager focused on providing organized, transparent, and professional rental support for both property owners and prospective tenants.": "Katherine Riordan 是一位专注的私人物业经理，致力于为业主和潜在租户提供有条理、透明且专业的租赁支持。",
      "She works closely with applicants throughout the leasing process, helping them understand application requirements, schedule property tours, and navigate each step with clarity and confidence.": "她在整个租赁过程中与申请人密切合作，帮助他们了解申请要求、安排看房，并清晰自信地完成每一步。",
      "With a strong emphasis on communication, reliability, and professionalism, Katherine is committed to creating a rental experience that feels smooth, well-structured, and respectful for everyone involved.": "Katherine 高度重视沟通、可靠性和专业精神，致力于为所有相关人员营造顺畅、有序且相互尊重的租赁体验。",
      "Her approach is centered around responsive communication, transparent expectations, and making the rental process as straightforward and stress-free as possible.": "她的工作方式以快速回应、透明预期为核心，并尽可能让租赁流程简单、清晰、少压力。",
      "HOA Logo": "HOA 标志",
      "Community & HOA Guidelines Respected": "尊重社区与 HOA 指南",
      "Managed in alignment with community standards": "按照社区标准协调管理",
      "Rental process": "租赁流程",
      "Simple next steps": "简单的后续步骤",
      "View Property Details": "查看房源详情",
      "Review available property information before applying.": "申请前请查看可用的房源信息。",
      "Submit Application": "提交申请",
      "Complete the secure rental application form.": "填写安全的租赁申请表。",
      "Refundable Application Fee": "可退还申请费",
      "Application fees are refundable if the application is not approved or the applicant chooses not to move forward after the tour.": "如果申请未获批准，或申请人在看房后选择不继续，申请费可退还。",
      "Next Steps": "下一步",
      "Qualified applicants will receive updates, tour scheduling, and further instructions.": "符合条件的申请人将收到更新、看房安排和进一步说明。",
      "Rental application questions": "租赁申请问题",
      "How do I apply for a rental?": "如何申请租房？",
      "You can apply directly through the secure rental application form on this website.": "您可以直接通过本网站的安全租赁申请表申请。",
      "Is there an application fee?": "是否有申请费？",
      "Yes. A refundable application fee may apply after submitting the application.": "是的。提交申请后可能会收取可退还申请费。",
      "Are listings always available?": "房源是否始终可用？",
      "Availability may change at any time depending on current occupancy and application status.": "可租情况可能随当前入住和申请状态随时变化。",
      "How will I be contacted?": "会如何联系我？",
      "Applicants are typically contacted using the phone number or email provided in the application form.": "通常会使用申请表中提供的电话或电子邮件联系申请人。",
      "Request guidance regarding availability, application steps, move-in timing, or general rental questions before proceeding.": "在采取下一步行动前，您可就可租情况、申请步骤、入住时间及其他租赁相关问题寻求指导。",
      "Property Manager": "物业经理",
      "Direct Contact": "直接联系",
      "For rental inquiries or application support, contact Katherine directly.": "如有关于租赁事宜或申请表协助的事项，请直接联系 Katherine。",
      "If you have questions regarding the application process, please contact Katherine Riordan directly.": "如对申请流程有任何疑问，请直接联系 Katherine Riordan。",
      "Email Katherine Riordan": "向 Katherine Riordan 发送电子邮件",
      "Call Katherine Riordan": "致电 Katherine Riordan",
      "© 2026 Katherine Riordan. Privately managed rentals.": "© 2026 Katherine Riordan。私人管理租赁。",
      "Secure rental application": "安全租赁申请",
      "Rental Application Form": "租赁申请表",
      "Please complete this form accurately. All information provided will remain confidential and is required solely for the rental application approval process. Each adult (18+) applying to live in the unit must complete a separate application.": "请准确填写此表。所有提供的信息都将保持保密，仅用于租赁申请审批流程。每位申请入住该单元的成年人（18岁及以上）都必须单独填写一份申请。",
      "This is a privately managed rental. All applications are reviewed directly by the property owner. No third-party agents are involved.": "这是私人管理的出租房。所有申请均由业主直接审核，不涉及第三方代理。",
      "This is a privately managed rental. All applications are reviewed directly by the property owner.": "这是私人管理的出租房。所有申请均由业主直接审核。",
      "Equal Housing Opportunity": "公平住房机会",
      "Secure SSL Encrypted Application": "SSL 加密安全申请",
      "Application Process Supported Through Zillow Rental Manager": "申请流程由 Zillow Rental Manager 提供支持",
      "Applications are securely submitted through Zillow Rental Manager in partnership with the property owner. No outside leasing agents are involved.": "申请通过 Zillow Rental Manager 与业主合作安全提交，不涉及外部租赁代理。",
      "Property Information": "房源信息",
      "Property applying for": "申请的房源",
      "Enter property address or listing name": "请输入房源地址或房源名称",
      "Select a property": "选择房源",
      "Desired move-in date": "期望入住日期",
      "Applicant Information": "申请人信息",
      "Full legal name": "法定全名",
      "Email address": "电子邮件",
      "Phone number": "电话号码",
      "Date of birth": "出生日期",
      "Residency History": "居住历史",
      "Current address": "当前地址",
      "Current landlord or manager": "当前房东或经理",
      "Landlord phone number": "房东电话",
      "How long have you lived there?": "您在那里住了多久？",
      "Employment & Income": "就业与收入",
      "Employer or income source": "雇主或收入来源",
      "Job title": "职位",
      "Gross monthly income": "税前月收入",
      "Employer phone number": "雇主电话",
      "Employer name": "雇主名称",
      "Enter employer or company name": "请输入雇主或公司名称",
      "Background Questions": "背景问题",
      "Have you ever been evicted?": "您是否曾被驱逐？",
      "Select an answer": "选择答案",
      "No": "否",
      "Yes": "是",
      "Have you filed bankruptcy in the last 7 years?": "过去 7 年内您是否申请过破产？",
      "If yes to any question, please explain": "如有任何问题回答是，请说明",
      "Additional Information": "其他信息",
      "Additional occupants": "其他住户",
      "Pets": "宠物",
      "Anything else you would like to share?": "还有其他想说明的吗？",
      "Emergency Contact": "紧急联系人",
      "Emergency contact name": "紧急联系人姓名",
      "Emergency contact phone": "紧急联系人电话",
      "Relationship": "关系",
      "Agreement": "确认",
      "I certify that the information provided is true and complete to the best of my knowledge.": "我确认所提供的信息据我所知真实且完整。",
      "Application received": "申请已收到",
      "Thank you. Your application has been submitted.": "谢谢。您的申请已提交。",
      "Your application is marked as received. Please watch your email or phone for updates from Katherine about review status, tour scheduling, or next-step instructions.": "您的申请已标记为收到。请留意电子邮件或电话，Katherine 将提供审核状态、看房安排或下一步说明。",
      "Status: Received": "状态：已收到",
      "Applications are reviewed directly by the property owner. You will be contacted if more information is needed.": "申请由业主直接审核。如需更多信息，将与您联系。",
      "Secure processing note": "安全处理说明",
      "Application details may be processed through Zillow Rental Manager in partnership with the property owner.": "申请详情可能通过 Zillow Rental Manager 与业主合作处理。",
      "Return Home": "返回首页",
      "Contact Katherine": "联系 Katherine",
      "Example: 2 years": "例如：2 年",
      "Names and relationship to applicant": "姓名及与申请人的关系",
      "Type, breed": "类型、品种",
      "Type, breed, weight, and age": "类型、品种、体重和年龄",
      "Submitting...": "正在提交...",
      "Submitting securely...": "正在安全提交...",
      "Application submitted. Redirecting...": "申请已提交。正在跳转...",
      "Submitted. Redirecting...": "已提交。正在跳转...",
      "Something went wrong. Please try again.": "出现问题。请重试。"
    },
    fr: {
      "Private Property Manager": "Gestionnaire privée de propriétés",
      "Open navigation": "Ouvrir la navigation",
      "Main navigation": "Navigation principale",
      "Language": "Langue",
      "Navigation": "Navigation",
      "Home": "Accueil",
      "About": "À propos",
      "Services": "Services",
      "Gallery": "Galerie",
      "Rental Process": "Processus de location",
      "FAQ": "FAQ",
      "Contact": "Contact",
      "Request Consultation": "Demander une consultation",
      "Apply Now": "Postuler Maintenant",
      "Back": "Retour",
      "Private property management": "Gestion privée de propriétés",
      "Professional and transparent rental coordination for applicants": "Coordination locative professionnelle et transparente pour les candidats",
      "Professional Photo Coming Soon": "Photo professionnelle à venir",
      "Professional rental support designed to make the leasing process organized, transparent, and efficient.": "Un accompagnement locatif professionnel conçu pour rendre le processus organisé, transparent et efficace.",
      "Tenant Screening & Application Review": "Sélection des locataires et examen des demandes",
      "Rental Listing & Marketing Support": "Soutien aux annonces locatives et au marketing",
      "Lease Coordination": "Coordination du bail",
      "Scheduling Property Tours": "Planification des visites du bien",
      "Managing Rental Inquiries & Tenant Communication": "Gestion des demandes locatives et communication avec les locataires",
      "Guiding Applicants Through The Approval Process": "Accompagnement des candidats pendant le processus d’approbation",
      "Lifestyle gallery": "Galerie de style de vie",
      "Community & Moments": "Communauté et moments",
      "A closer look at the lifestyle, comfort, and community experience.": "Un aperçu plus proche du style de vie, du confort et de l’expérience communautaire.",
      "Previous image": "Image précédente",
      "Next image": "Image suivante",
      "Gallery navigation": "Navigation de la galerie",
      "Privately managed rentals": "Locations gérées en privé",
      "Quality rental homes with a simple and transparent application process.": "Des logements locatifs de qualité avec un processus de demande simple et transparent.",
      "Katherine Riordan offers privately managed rental homes focused on transparency, responsive communication, and a smooth leasing experience.": "Katherine Riordan propose des logements locatifs gérés en privé, avec transparence, communication réactive et expérience de location fluide.",
      "Secure Application Processing": "Traitement sécurisé des demandes",
      "Applications are securely processed through Zillow Rental Manager in partnership with the property owner.": "Les demandes sont traitées de manière sécurisée via Zillow Rental Manager en partenariat avec la propriétaire.",
      "About Katherine": "À propos de Katherine",
      "Private rental management with direct owner oversight.": "Gestion locative privée avec supervision directe de la propriétaire.",
      "Katherine Riordan is a dedicated private property manager focused on providing organized, transparent, and professional rental support for both property owners and prospective tenants.": "Katherine Riordan est une gestionnaire privée de propriétés dévouée, axée sur un accompagnement locatif organisé, transparent et professionnel pour les propriétaires comme pour les futurs locataires.",
      "She works closely with applicants throughout the leasing process, helping them understand application requirements, schedule property tours, and navigate each step with clarity and confidence.": "Elle travaille étroitement avec les candidats tout au long du processus de location, les aidant à comprendre les exigences de demande, à planifier les visites et à avancer à chaque étape avec clarté et confiance.",
      "With a strong emphasis on communication, reliability, and professionalism, Katherine is committed to creating a rental experience that feels smooth, well-structured, and respectful for everyone involved.": "Avec une forte priorité donnée à la communication, à la fiabilité et au professionnalisme, Katherine s’engage à créer une expérience de location fluide, bien structurée et respectueuse pour toutes les personnes impliquées.",
      "Her approach is centered around responsive communication, transparent expectations, and making the rental process as straightforward and stress-free as possible.": "Son approche repose sur une communication réactive, des attentes transparentes et un processus de location aussi simple et serein que possible.",
      "HOA Logo": "Logo HOA",
      "Community & HOA Guidelines Respected": "Directives de la communauté et de la HOA respectées",
      "Managed in alignment with community standards": "Géré en accord avec les standards de la communauté",
      "Rental process": "Processus de location",
      "Simple next steps": "Étapes simples",
      "View Property Details": "Consulter les détails du bien",
      "Review available property information before applying.": "Consultez les informations disponibles sur le bien avant de postuler.",
      "Submit Application": "Envoyer la demande",
      "Complete the secure rental application form.": "Remplissez le formulaire sécurisé de demande de location.",
      "Refundable Application Fee": "Frais de demande remboursables",
      "Application fees are refundable if the application is not approved or the applicant chooses not to move forward after the tour.": "Les frais de demande sont remboursables si la demande n’est pas approuvée ou si le candidat choisit de ne pas poursuivre après la visite.",
      "Next Steps": "Étapes suivantes",
      "Qualified applicants will receive updates, tour scheduling, and further instructions.": "Les candidats qualifiés recevront des mises à jour, la planification de visite et des instructions supplémentaires.",
      "Rental application questions": "Questions sur la demande de location",
      "How do I apply for a rental?": "Comment postuler pour une location ?",
      "You can apply directly through the secure rental application form on this website.": "Vous pouvez postuler directement via le formulaire sécurisé de ce site.",
      "Is there an application fee?": "Y a-t-il des frais de demande ?",
      "Yes. A refundable application fee may apply after submitting the application.": "Oui. Des frais de demande remboursables peuvent s’appliquer après l’envoi de la demande.",
      "Are listings always available?": "Les annonces sont-elles toujours disponibles ?",
      "Availability may change at any time depending on current occupancy and application status.": "La disponibilité peut changer à tout moment selon l’occupation actuelle et l’état des demandes.",
      "How will I be contacted?": "Comment serai-je contacté ?",
      "Applicants are typically contacted using the phone number or email provided in the application form.": "Les candidats sont généralement contactés au numéro de téléphone ou à l’adresse e-mail fournis dans le formulaire.",
      "Request guidance regarding availability, application steps, move-in timing, or general rental questions before proceeding.": "Demandez des précisions concernant les disponibilités, les étapes de candidature, le calendrier d’emménagement ou vos questions générales sur la location avant de poursuivre.",
      "Property Manager": "Gestionnaire de propriétés",
      "Direct Contact": "Contact direct",
      "For rental inquiries or application support, contact Katherine directly.": "Pour toute demande liée à la location ou au dossier de candidature, vous pouvez contacter Katherine directement.",
      "If you have questions regarding the application process, please contact Katherine Riordan directly.": "Pour toute question sur le déroulement de la candidature, veuillez contacter Katherine Riordan directement.",
      "Email Katherine Riordan": "Envoyer un e-mail à Katherine Riordan",
      "Call Katherine Riordan": "Appeler Katherine Riordan",
      "© 2026 Katherine Riordan. Privately managed rentals.": "© 2026 Katherine Riordan. Locations gérées en privé.",
      "Secure rental application": "Demande de location sécurisée",
      "Rental Application Form": "Formulaire de demande de location",
      "Please complete this form accurately. All information provided will remain confidential and is required solely for the rental application approval process. Each adult (18+) applying to live in the unit must complete a separate application.": "Veuillez remplir ce formulaire avec précision. Toutes les informations fournies resteront confidentielles et sont requises uniquement pour le processus d’approbation de la demande de location. Chaque adulte (18 ans et plus) souhaitant vivre dans le logement doit remplir une demande distincte.",
      "This is a privately managed rental. All applications are reviewed directly by the property owner. No third-party agents are involved.": "Il s’agit d’une location gérée en privé. Toutes les demandes sont examinées directement par la propriétaire. Aucun agent tiers n’intervient.",
      "This is a privately managed rental. All applications are reviewed directly by the property owner.": "Il s’agit d’une location gérée en privé. Toutes les demandes sont examinées directement par la propriétaire.",
      "Equal Housing Opportunity": "Égalité d’accès au logement",
      "Secure SSL Encrypted Application": "Demande sécurisée chiffrée SSL",
      "Application Process Supported Through Zillow Rental Manager": "Processus de candidature pris en charge via Zillow Rental Manager",
      "Applications are securely submitted through Zillow Rental Manager in partnership with the property owner. No outside leasing agents are involved.": "Les demandes sont envoyées en toute sécurité via Zillow Rental Manager en partenariat avec la propriétaire. Aucun agent de location externe n’intervient.",
      "Property Information": "Informations sur le bien",
      "Property applying for": "Bien demandé",
      "Enter property address or listing name": "Indiquez l’adresse du bien ou le nom de l’annonce",
      "Select a property": "Sélectionner un bien",
      "Desired move-in date": "Date d’emménagement souhaitée",
      "Applicant Information": "Informations du candidat",
      "Full legal name": "Nom légal complet",
      "Email address": "Adresse e-mail",
      "Phone number": "Numéro de téléphone",
      "Date of birth": "Date de naissance",
      "Residency History": "Historique de résidence",
      "Current address": "Adresse actuelle",
      "Current landlord or manager": "Propriétaire ou gestionnaire actuel",
      "Landlord phone number": "Téléphone du propriétaire",
      "How long have you lived there?": "Depuis combien de temps y habitez-vous ?",
      "Employment & Income": "Emploi et revenus",
      "Employer or income source": "Employeur ou source de revenus",
      "Job title": "Poste",
      "Gross monthly income": "Revenu mensuel brut",
      "Employer phone number": "Téléphone de l’employeur",
      "Employer name": "Nom de l’employeur",
      "Enter employer or company name": "Indiquez le nom de l’employeur ou de l’entreprise",
      "Background Questions": "Questions d’antécédents",
      "Have you ever been evicted?": "Avez-vous déjà été expulsé ?",
      "Select an answer": "Sélectionner une réponse",
      "No": "Non",
      "Yes": "Oui",
      "Have you filed bankruptcy in the last 7 years?": "Avez-vous déclaré faillite au cours des 7 dernières années ?",
      "If yes to any question, please explain": "Si oui à une question, veuillez expliquer",
      "Additional Information": "Informations supplémentaires",
      "Additional occupants": "Occupants supplémentaires",
      "Pets": "Animaux",
      "Anything else you would like to share?": "Souhaitez-vous ajouter autre chose ?",
      "Emergency Contact": "Contact d’urgence",
      "Emergency contact name": "Nom du contact d’urgence",
      "Emergency contact phone": "Téléphone du contact d’urgence",
      "Relationship": "Relation",
      "Agreement": "Attestation",
      "I certify that the information provided is true and complete to the best of my knowledge.": "Je certifie que les informations fournies sont vraies et complètes à ma connaissance.",
      "Application received": "Demande reçue",
      "Thank you. Your application has been submitted.": "Merci. Votre demande a été envoyée.",
      "Your application is marked as received. Please watch your email or phone for updates from Katherine about review status, tour scheduling, or next-step instructions.": "Votre demande est marquée comme reçue. Surveillez votre e-mail ou téléphone pour les mises à jour de Katherine concernant l’examen, les visites ou les prochaines étapes.",
      "Status: Received": "Statut : reçue",
      "Applications are reviewed directly by the property owner. You will be contacted if more information is needed.": "Les demandes sont examinées directement par la propriétaire. Vous serez contacté si des informations supplémentaires sont nécessaires.",
      "Secure processing note": "Note de traitement sécurisé",
      "Application details may be processed through Zillow Rental Manager in partnership with the property owner.": "Les détails de la demande peuvent être traités via Zillow Rental Manager en partenariat avec la propriétaire.",
      "Return Home": "Retour à l’accueil",
      "Contact Katherine": "Contacter Katherine",
      "Example: 2 years": "Exemple : 2 ans",
      "Names and relationship to applicant": "Noms et relation avec le candidat",
      "Type, breed": "Type, race",
      "Type, breed, weight, and age": "Type, race, poids et âge",
      "Submitting...": "Envoi en cours...",
      "Submitting securely...": "Envoi sécurisé en cours...",
      "Application submitted. Redirecting...": "Demande envoyée. Redirection...",
      "Submitted. Redirecting...": "Envoyée. Redirection...",
      "Something went wrong. Please try again.": "Une erreur est survenue. Veuillez réessayer."
    },
    pt: {
      "Private Property Manager": "Administradora Privada de Propriedades",
      "Open navigation": "Abrir navegação",
      "Main navigation": "Navegação principal",
      "Language": "Idioma",
      "Navigation": "Navegação",
      "Home": "Início",
      "About": "Sobre",
      "Services": "Serviços",
      "Gallery": "Galeria",
      "Rental Process": "Processo de aluguel",
      "FAQ": "Perguntas",
      "Contact": "Contato",
      "Request Consultation": "Solicitar consulta",
      "Apply Now": "Aplicar Agora",
      "Back": "Voltar",
      "Private property management": "Administração privada de propriedades",
      "Professional and transparent rental coordination for applicants": "Coordenação de aluguel profissional e transparente para candidatos",
      "Professional Photo Coming Soon": "Foto profissional em breve",
      "Professional rental support designed to make the leasing process organized, transparent, and efficient.": "Suporte profissional de aluguel projetado para tornar o processo de locação organizado, transparente e eficiente.",
      "Tenant Screening & Application Review": "Triagem de inquilinos e análise de solicitações",
      "Rental Listing & Marketing Support": "Suporte para anúncios e marketing de aluguel",
      "Lease Coordination": "Coordenação de contrato de locação",
      "Scheduling Property Tours": "Agendamento de visitas ao imóvel",
      "Managing Rental Inquiries & Tenant Communication": "Gestão de consultas de aluguel e comunicação com inquilinos",
      "Guiding Applicants Through The Approval Process": "Orientação aos candidatos durante o processo de aprovação",
      "Lifestyle gallery": "Galeria de estilo de vida",
      "Community & Moments": "Comunidade e momentos",
      "A closer look at the lifestyle, comfort, and community experience.": "Um olhar mais próximo sobre o estilo de vida, o conforto e a experiência da comunidade.",
      "Previous image": "Imagem anterior",
      "Next image": "Próxima imagem",
      "Gallery navigation": "Navegação da galeria",
      "Privately managed rentals": "Aluguéis administrados de forma privada",
      "Quality rental homes with a simple and transparent application process.": "Imóveis de aluguel de qualidade com um processo de solicitação simples e transparente.",
      "Katherine Riordan offers privately managed rental homes focused on transparency, responsive communication, and a smooth leasing experience.": "Katherine Riordan oferece imóveis de aluguel administrados de forma privada, com foco em transparência, comunicação rápida e uma experiência de locação tranquila.",
      "Secure Application Processing": "Processamento seguro de solicitações",
      "Applications are securely processed through Zillow Rental Manager in partnership with the property owner.": "As solicitações são processadas com segurança pelo Zillow Rental Manager em parceria com a proprietária.",
      "About Katherine": "Sobre Katherine",
      "Private rental management with direct owner oversight.": "Administração privada de aluguel com supervisão direta da proprietária.",
      "Katherine Riordan is a dedicated private property manager focused on providing organized, transparent, and professional rental support for both property owners and prospective tenants.": "Katherine Riordan é uma administradora privada de propriedades dedicada a oferecer suporte de aluguel organizado, transparente e profissional para proprietários e possíveis inquilinos.",
      "She works closely with applicants throughout the leasing process, helping them understand application requirements, schedule property tours, and navigate each step with clarity and confidence.": "Ela trabalha de perto com os candidatos durante todo o processo de locação, ajudando-os a entender os requisitos da solicitação, agendar visitas ao imóvel e avançar em cada etapa com clareza e confiança.",
      "With a strong emphasis on communication, reliability, and professionalism, Katherine is committed to creating a rental experience that feels smooth, well-structured, and respectful for everyone involved.": "Com forte ênfase em comunicação, confiabilidade e profissionalismo, Katherine se compromete a criar uma experiência de aluguel tranquila, bem estruturada e respeitosa para todos os envolvidos.",
      "Her approach is centered around responsive communication, transparent expectations, and making the rental process as straightforward and stress-free as possible.": "Sua abordagem é centrada em comunicação ágil, expectativas transparentes e em tornar o processo de aluguel o mais simples e livre de estresse possível.",
      "HOA Logo": "Logo HOA",
      "Community & HOA Guidelines Respected": "Diretrizes da comunidade e da HOA respeitadas",
      "Managed in alignment with community standards": "Administrado em alinhamento com os padrões da comunidade",
      "Rental process": "Processo de aluguel",
      "Simple next steps": "Próximos passos simples",
      "View Property Details": "Ver detalhes do imóvel",
      "Review available property information before applying.": "Revise as informações disponíveis do imóvel antes de aplicar.",
      "Submit Application": "Enviar solicitação",
      "Complete the secure rental application form.": "Preencha o formulário seguro de solicitação de aluguel.",
      "Refundable Application Fee": "Taxa de solicitação reembolsável",
      "Application fees are refundable if the application is not approved or the applicant chooses not to move forward after the tour.": "As taxas de solicitação são reembolsáveis se a solicitação não for aprovada ou se o candidato decidir não continuar após a visita.",
      "Next Steps": "Próximos passos",
      "Qualified applicants will receive updates, tour scheduling, and further instructions.": "Candidatos qualificados receberão atualizações, agendamento de visita e instruções adicionais.",
      "Rental application questions": "Perguntas sobre a solicitação de aluguel",
      "How do I apply for a rental?": "Como aplico para um aluguel?",
      "You can apply directly through the secure rental application form on this website.": "Você pode aplicar diretamente pelo formulário seguro de solicitação de aluguel neste site.",
      "Is there an application fee?": "Há uma taxa de solicitação?",
      "Yes. A refundable application fee may apply after submitting the application.": "Sim. Uma taxa de solicitação reembolsável pode ser aplicada após o envio.",
      "Are listings always available?": "Os imóveis estão sempre disponíveis?",
      "Availability may change at any time depending on current occupancy and application status.": "A disponibilidade pode mudar a qualquer momento conforme a ocupação atual e o status das solicitações.",
      "How will I be contacted?": "Como entraremos em contato?",
      "Applicants are typically contacted using the phone number or email provided in the application form.": "Os candidatos geralmente são contatados pelo telefone ou e-mail informado no formulário.",
      "Request guidance regarding availability, application steps, move-in timing, or general rental questions before proceeding.": "Solicite orientação sobre disponibilidade, etapas da candidatura, datas de mudança ou perguntas gerais sobre o aluguel antes de prosseguir.",
      "Property Manager": "Gestora de propriedades",
      "Direct Contact": "Contato direto",
      "For rental inquiries or application support, contact Katherine directly.": "Para dúvidas sobre aluguel ou apoio com sua candidatura, entre em contato diretamente com Katherine.",
      "If you have questions regarding the application process, please contact Katherine Riordan directly.": "Em caso de dúvidas sobre o processo de solicitação, entre em contato diretamente com Katherine Riordan.",
      "Email Katherine Riordan": "Enviar e-mail para Katherine Riordan",
      "Call Katherine Riordan": "Ligar para Katherine Riordan",
      "© 2026 Katherine Riordan. Privately managed rentals.": "© 2026 Katherine Riordan. Aluguéis administrados de forma privada.",
      "Secure rental application": "Solicitação segura de aluguel",
      "Rental Application Form": "Formulário de Solicitação de Aluguel",
      "Please complete this form accurately. All information provided will remain confidential and is required solely for the rental application approval process. Each adult (18+) applying to live in the unit must complete a separate application.": "Preencha este formulário com precisão. Todas as informações fornecidas permanecerão confidenciais e são necessárias exclusivamente para o processo de aprovação da solicitação de aluguel. Cada adulto (18+) que se candidatar para morar na unidade deve preencher uma solicitação separada.",
      "This is a privately managed rental. All applications are reviewed directly by the property owner. No third-party agents are involved.": "Este é um aluguel administrado de forma privada. Todas as solicitações são analisadas diretamente pela proprietária. Não há agentes terceiros envolvidos.",
      "This is a privately managed rental. All applications are reviewed directly by the property owner.": "Este é um aluguel administrado de forma privada. Todas as solicitações são analisadas diretamente pela proprietária.",
      "Equal Housing Opportunity": "Igualdade de oportunidade de moradia",
      "Secure SSL Encrypted Application": "Solicitação segura com criptografia SSL",
      "Application Process Supported Through Zillow Rental Manager": "Processo de solicitação apoiado pelo Zillow Rental Manager",
      "Applications are securely submitted through Zillow Rental Manager in partnership with the property owner. No outside leasing agents are involved.": "As solicitações são enviadas com segurança pelo Zillow Rental Manager em parceria com a proprietária. Não há agentes de locação externos envolvidos.",
      "Property Information": "Informações do imóvel",
      "Property applying for": "Imóvel para o qual aplica",
      "Enter property address or listing name": "Informe o endereço do imóvel ou o nome do anúncio",
      "Select a property": "Selecione um imóvel",
      "Desired move-in date": "Data desejada de mudança",
      "Applicant Information": "Informações do candidato",
      "Full legal name": "Nome legal completo",
      "Email address": "E-mail",
      "Phone number": "Telefone",
      "Date of birth": "Data de nascimento",
      "Residency History": "Histórico de residência",
      "Current address": "Endereço atual",
      "Current landlord or manager": "Proprietário ou administrador atual",
      "Landlord phone number": "Telefone do proprietário",
      "How long have you lived there?": "Há quanto tempo você mora lá?",
      "Employment & Income": "Emprego e renda",
      "Employer or income source": "Empregador ou fonte de renda",
      "Job title": "Cargo",
      "Gross monthly income": "Renda mensal bruta",
      "Employer phone number": "Telefone do empregador",
      "Employer name": "Nome do empregador",
      "Enter employer or company name": "Informe o nome do empregador ou da empresa",
      "Background Questions": "Perguntas de antecedentes",
      "Have you ever been evicted?": "Você já foi despejado?",
      "Select an answer": "Selecione uma resposta",
      "No": "Não",
      "Yes": "Sim",
      "Have you filed bankruptcy in the last 7 years?": "Você declarou falência nos últimos 7 anos?",
      "If yes to any question, please explain": "Se respondeu sim a alguma pergunta, explique",
      "Additional Information": "Informações adicionais",
      "Additional occupants": "Ocupantes adicionais",
      "Pets": "Animais de estimação",
      "Anything else you would like to share?": "Há mais algo que deseja compartilhar?",
      "Emergency Contact": "Contato de emergência",
      "Emergency contact name": "Nome do contato de emergência",
      "Emergency contact phone": "Telefone do contato de emergência",
      "Relationship": "Relação",
      "Agreement": "Declaração",
      "I certify that the information provided is true and complete to the best of my knowledge.": "Certifico que as informações fornecidas são verdadeiras e completas conforme meu conhecimento.",
      "Application received": "Solicitação recebida",
      "Thank you. Your application has been submitted.": "Obrigado. Sua solicitação foi enviada.",
      "Your application is marked as received. Please watch your email or phone for updates from Katherine about review status, tour scheduling, or next-step instructions.": "Sua solicitação foi marcada como recebida. Verifique seu e-mail ou telefone para atualizações de Katherine sobre análise, visitas ou próximos passos.",
      "Status: Received": "Status: recebida",
      "Applications are reviewed directly by the property owner. You will be contacted if more information is needed.": "As solicitações são analisadas diretamente pela proprietária. Você será contatado se forem necessárias mais informações.",
      "Secure processing note": "Nota de processamento seguro",
      "Application details may be processed through Zillow Rental Manager in partnership with the property owner.": "Os detalhes da solicitação podem ser processados pelo Zillow Rental Manager em parceria com a proprietária.",
      "Return Home": "Voltar ao início",
      "Contact Katherine": "Contatar Katherine",
      "Example: 2 years": "Exemplo: 2 anos",
      "Names and relationship to applicant": "Nomes e relação com o candidato",
      "Type, breed": "Tipo, raça",
      "Type, breed, weight, and age": "Tipo, raça, peso e idade",
      "Submitting...": "Enviando...",
      "Submitting securely...": "Enviando com segurança...",
      "Application submitted. Redirecting...": "Solicitação enviada. Redirecionando...",
      "Submitted. Redirecting...": "Enviada. Redirecionando...",
      "Something went wrong. Please try again.": "Algo deu errado. Tente novamente."
    },
    ar: {
      "Private Property Manager": "مديرة عقارات خاصة",
      "Open navigation": "فتح التنقل",
      "Main navigation": "التنقل الرئيسي",
      "Language": "اللغة",
      "Navigation": "التنقل",
      "Home": "الرئيسية",
      "About": "نبذة",
      "Services": "الخدمات",
      "Gallery": "المعرض",
      "Rental Process": "عملية الإيجار",
      "FAQ": "الأسئلة الشائعة",
      "Contact": "اتصال",
      "Request Consultation": "طلب استشارة",
      "Apply Now": "قدم الآن",
      "Back": "رجوع",
      "Private property management": "إدارة عقارات خاصة",
      "Professional and transparent rental coordination for applicants": "تنسيق إيجار مهني وشفاف للمتقدمين",
      "Professional Photo Coming Soon": "الصورة المهنية قريباً",
      "Professional rental support designed to make the leasing process organized, transparent, and efficient.": "دعم إيجار مهني مصمم لجعل عملية التأجير منظمة وشفافة وفعالة.",
      "Tenant Screening & Application Review": "فحص المستأجرين ومراجعة الطلبات",
      "Rental Listing & Marketing Support": "دعم إدراج وتسويق الإيجارات",
      "Lease Coordination": "تنسيق عقد الإيجار",
      "Scheduling Property Tours": "جدولة جولات العقار",
      "Managing Rental Inquiries & Tenant Communication": "إدارة استفسارات الإيجار والتواصل مع المستأجرين",
      "Guiding Applicants Through The Approval Process": "إرشاد المتقدمين خلال عملية الموافقة",
      "Lifestyle gallery": "معرض نمط الحياة",
      "Community & Moments": "المجتمع واللحظات",
      "A closer look at the lifestyle, comfort, and community experience.": "نظرة أقرب على نمط الحياة والراحة وتجربة المجتمع.",
      "Previous image": "الصورة السابقة",
      "Next image": "الصورة التالية",
      "Gallery navigation": "تنقل المعرض",
      "Privately managed rentals": "إيجارات بإدارة خاصة",
      "Quality rental homes with a simple and transparent application process.": "منازل إيجار عالية الجودة مع عملية تقديم بسيطة وشفافة.",
      "Katherine Riordan offers privately managed rental homes focused on transparency, responsive communication, and a smooth leasing experience.": "تقدم Katherine Riordan منازل إيجار بإدارة خاصة تركز على الشفافية والتواصل السريع وتجربة تأجير سلسة.",
      "Secure Application Processing": "معالجة آمنة للطلبات",
      "Applications are securely processed through Zillow Rental Manager in partnership with the property owner.": "تتم معالجة الطلبات بأمان عبر Zillow Rental Manager بالشراكة مع مالكة العقار.",
      "About Katherine": "نبذة عن Katherine",
      "Private rental management with direct owner oversight.": "إدارة إيجار خاصة بإشراف مباشر من المالكة.",
      "Katherine Riordan is a dedicated private property manager focused on providing organized, transparent, and professional rental support for both property owners and prospective tenants.": "Katherine Riordan مديرة عقارات خاصة متفانية تركز على تقديم دعم إيجاري منظم وشفاف ومهني لكل من مالكي العقارات والمستأجرين المحتملين.",
      "She works closely with applicants throughout the leasing process, helping them understand application requirements, schedule property tours, and navigate each step with clarity and confidence.": "تعمل عن قرب مع المتقدمين طوال عملية التأجير، وتساعدهم على فهم متطلبات الطلب وجدولة جولات العقار والتنقل في كل خطوة بوضوح وثقة.",
      "With a strong emphasis on communication, reliability, and professionalism, Katherine is committed to creating a rental experience that feels smooth, well-structured, and respectful for everyone involved.": "مع تركيز قوي على التواصل والموثوقية والمهنية، تلتزم Katherine بخلق تجربة إيجار سلسة ومنظمة ومحترمة لجميع الأطراف.",
      "Her approach is centered around responsive communication, transparent expectations, and making the rental process as straightforward and stress-free as possible.": "يرتكز نهجها على التواصل السريع والتوقعات الشفافة وجعل عملية الإيجار مباشرة وخالية من التوتر قدر الإمكان.",
      "HOA Logo": "شعار HOA",
      "Community & HOA Guidelines Respected": "احترام إرشادات المجتمع و HOA",
      "Managed in alignment with community standards": "تتم الإدارة بما يتماشى مع معايير المجتمع",
      "Rental process": "عملية الإيجار",
      "Simple next steps": "خطوات تالية بسيطة",
      "View Property Details": "عرض تفاصيل العقار",
      "Review available property information before applying.": "راجع معلومات العقار المتاحة قبل التقديم.",
      "Submit Application": "إرسال الطلب",
      "Complete the secure rental application form.": "أكمل نموذج طلب الإيجار الآمن.",
      "Refundable Application Fee": "رسوم طلب قابلة للاسترداد",
      "Application fees are refundable if the application is not approved or the applicant chooses not to move forward after the tour.": "رسوم الطلب قابلة للاسترداد إذا لم تتم الموافقة على الطلب أو إذا اختار المتقدم عدم المتابعة بعد الجولة.",
      "Next Steps": "الخطوات التالية",
      "Qualified applicants will receive updates, tour scheduling, and further instructions.": "سيتلقى المتقدمون المؤهلون تحديثات وجدولة للجولة وتعليمات إضافية.",
      "Rental application questions": "أسئلة طلب الإيجار",
      "How do I apply for a rental?": "كيف أقدم على إيجار؟",
      "You can apply directly through the secure rental application form on this website.": "يمكنك التقديم مباشرة عبر نموذج طلب الإيجار الآمن على هذا الموقع.",
      "Is there an application fee?": "هل توجد رسوم طلب؟",
      "Yes. A refundable application fee may apply after submitting the application.": "نعم. قد تطبق رسوم طلب قابلة للاسترداد بعد إرسال الطلب.",
      "Are listings always available?": "هل القوائم متاحة دائماً؟",
      "Availability may change at any time depending on current occupancy and application status.": "قد يتغير التوافر في أي وقت حسب الإشغال الحالي وحالة الطلبات.",
      "How will I be contacted?": "كيف سيتم التواصل معي؟",
      "Applicants are typically contacted using the phone number or email provided in the application form.": "عادة يتم التواصل مع المتقدمين عبر رقم الهاتف أو البريد الإلكتروني المقدم في نموذج الطلب.",
      "Request guidance regarding availability, application steps, move-in timing, or general rental questions before proceeding.": "اطلب الإرشاد بشأن التوفّر أو خطوات الطلب أو مواعيد الانتقال أو أي استفسارات عامة حول الإيجار قبل المتابعة.",
      "Property Manager": "مديرة عقارية",
      "Direct Contact": "تواصل مباشر",
      "For rental inquiries or application support, contact Katherine directly.": "للاستفسارات عن الإيجار أو الدعم بخصوص الطلب، يمكنكم التواصل مع Katherine مباشرةً.",
      "If you have questions regarding the application process, please contact Katherine Riordan directly.": "إذا كان لديكم أي أسئلة بشأن عملية التقديم، يُرجى التواصل مباشرةً مع Katherine Riordan.",
      "Email Katherine Riordan": "مراسلة Katherine Riordan عبر البريد الإلكتروني",
      "Call Katherine Riordan": "الاتصال بـ Katherine Riordan",
      "© 2026 Katherine Riordan. Privately managed rentals.": "© 2026 Katherine Riordan. إيجارات بإدارة خاصة.",
      "Secure rental application": "طلب إيجار آمن",
      "Rental Application Form": "نموذج طلب الإيجار",
      "Please complete this form accurately. All information provided will remain confidential and is required solely for the rental application approval process. Each adult (18+) applying to live in the unit must complete a separate application.": "يرجى إكمال هذا النموذج بدقة. ستبقى جميع المعلومات المقدمة سرية وهي مطلوبة فقط لعملية الموافقة على طلب الإيجار. يجب على كل بالغ (18+) يتقدم للسكن في الوحدة إكمال طلب منفصل.",
      "This is a privately managed rental. All applications are reviewed directly by the property owner. No third-party agents are involved.": "هذا إيجار بإدارة خاصة. تتم مراجعة جميع الطلبات مباشرة من مالكة العقار. لا يشارك أي وكلاء من طرف ثالث.",
      "This is a privately managed rental. All applications are reviewed directly by the property owner.": "هذا إيجار بإدارة خاصة. تتم مراجعة جميع الطلبات مباشرة من مالكة العقار.",
      "Equal Housing Opportunity": "فرص إسكان متكافئة",
      "Secure SSL Encrypted Application": "طلب آمن ومشفّر عبر SSL",
      "Application Process Supported Through Zillow Rental Manager": "عملية الطلب مدعومة عبر Zillow Rental Manager",
      "Applications are securely submitted through Zillow Rental Manager in partnership with the property owner. No outside leasing agents are involved.": "يتم إرسال الطلبات بأمان عبر Zillow Rental Manager بالشراكة مع مالكة العقار. لا يشارك أي وكلاء تأجير خارجيين.",
      "Property Information": "معلومات العقار",
      "Property applying for": "العقار المتقدم له",
      "Enter property address or listing name": "أدخل عنوان العقار أو اسم الإعلان",
      "Select a property": "اختر عقاراً",
      "Desired move-in date": "تاريخ الانتقال المطلوب",
      "Applicant Information": "معلومات المتقدم",
      "Full legal name": "الاسم القانوني الكامل",
      "Email address": "البريد الإلكتروني",
      "Phone number": "رقم الهاتف",
      "Date of birth": "تاريخ الميلاد",
      "Residency History": "سجل السكن",
      "Current address": "العنوان الحالي",
      "Current landlord or manager": "المالك أو المدير الحالي",
      "Landlord phone number": "هاتف المالك",
      "How long have you lived there?": "منذ متى تعيش هناك؟",
      "Employment & Income": "العمل والدخل",
      "Employer or income source": "صاحب العمل أو مصدر الدخل",
      "Job title": "المسمى الوظيفي",
      "Gross monthly income": "الدخل الشهري الإجمالي",
      "Employer phone number": "هاتف صاحب العمل",
      "Employer name": "اسم صاحب العمل",
      "Enter employer or company name": "أدخل اسم صاحب العمل أو الشركة",
      "Background Questions": "أسئلة الخلفية",
      "Have you ever been evicted?": "هل سبق أن تم إخلاؤك؟",
      "Select an answer": "اختر إجابة",
      "No": "لا",
      "Yes": "نعم",
      "Have you filed bankruptcy in the last 7 years?": "هل أعلنت الإفلاس خلال السنوات السبع الماضية؟",
      "If yes to any question, please explain": "إذا كانت الإجابة نعم على أي سؤال، يرجى التوضيح",
      "Additional Information": "معلومات إضافية",
      "Additional occupants": "ساكنون إضافيون",
      "Pets": "حيوانات أليفة",
      "Anything else you would like to share?": "هل هناك شيء آخر ترغب في مشاركته؟",
      "Emergency Contact": "جهة اتصال للطوارئ",
      "Emergency contact name": "اسم جهة اتصال الطوارئ",
      "Emergency contact phone": "هاتف جهة اتصال الطوارئ",
      "Relationship": "العلاقة",
      "Agreement": "إقرار",
      "I certify that the information provided is true and complete to the best of my knowledge.": "أقر بأن المعلومات المقدمة صحيحة وكاملة حسب علمي.",
      "Application received": "تم استلام الطلب",
      "Thank you. Your application has been submitted.": "شكراً لك. تم إرسال طلبك.",
      "Your application is marked as received. Please watch your email or phone for updates from Katherine about review status, tour scheduling, or next-step instructions.": "تم وضع علامة على طلبك كطلب مستلم. يرجى متابعة بريدك الإلكتروني أو هاتفك للحصول على تحديثات من Katherine حول حالة المراجعة أو جدولة الجولة أو تعليمات الخطوة التالية.",
      "Status: Received": "الحالة: تم الاستلام",
      "Applications are reviewed directly by the property owner. You will be contacted if more information is needed.": "تتم مراجعة الطلبات مباشرة من مالكة العقار. سيتم التواصل معك إذا كانت هناك حاجة إلى مزيد من المعلومات.",
      "Secure processing note": "ملاحظة المعالجة الآمنة",
      "Application details may be processed through Zillow Rental Manager in partnership with the property owner.": "قد تتم معالجة تفاصيل الطلب عبر Zillow Rental Manager بالشراكة مع مالكة العقار.",
      "Return Home": "العودة للرئيسية",
      "Contact Katherine": "التواصل مع Katherine",
      "Example: 2 years": "مثال: سنتان",
      "Names and relationship to applicant": "الأسماء والعلاقة بالمتقدم",
      "Type, breed": "النوع والسلالة",
      "Type, breed, weight, and age": "النوع والسلالة والوزن والعمر",
      "Submitting...": "جارٍ الإرسال...",
      "Submitting securely...": "جارٍ الإرسال بأمان...",
      "Application submitted. Redirecting...": "تم إرسال الطلب. جارٍ التحويل...",
      "Submitted. Redirecting...": "تم الإرسال. جارٍ التحويل...",
      "Something went wrong. Please try again.": "حدث خطأ ما. يرجى المحاولة مرة أخرى."
    }
  };

  const aliases = {
    "Administradora Privada de Propiedades": "Private Property Manager",
    "Abrir navegación": "Open navigation",
    "Navegación principal": "Main navigation",
    "Idioma": "Language",
    "Navegación": "Navigation",
    "Inicio": "Home",
    "Acerca de": "About",
    "Servicios": "Services",
    "Galería": "Gallery",
    "Proceso de alquiler": "Rental Process",
    "Preguntas": "FAQ",
    "Contacto": "Contact",
    "Solicitar consulta": "Request Consultation",
    "Aplicar Ahora": "Apply Now",
    "Volver": "Back",
    "Administración privada de propiedades": "Private property management",
    "Coordinación de alquiler profesional y transparente para solicitantes": "Professional and transparent rental coordination for applicants",
    "Foto profesional próximamente": "Professional Photo Coming Soon",
    "Apoyo profesional de alquiler diseñado para que el proceso de arrendamiento sea organizado, transparente y eficiente.": "Professional rental support designed to make the leasing process organized, transparent, and efficient.",
    "Revisión de solicitudes y evaluación de inquilinos": "Tenant Screening & Application Review",
    "Apoyo de publicación y marketing de alquileres": "Rental Listing & Marketing Support",
    "Coordinación de contrato de arrendamiento": "Lease Coordination",
    "Programación de visitas a la propiedad": "Scheduling Property Tours",
    "Gestión de consultas de alquiler y comunicación con inquilinos": "Managing Rental Inquiries & Tenant Communication",
    "Guía para solicitantes durante el proceso de aprobación": "Guiding Applicants Through The Approval Process",
    "Galería de estilo de vida": "Lifestyle gallery",
    "Comunidad y momentos": "Community & Moments",
    "Una mirada más cercana al estilo de vida, la comodidad y la experiencia comunitaria.": "A closer look at the lifestyle, comfort, and community experience.",
    "Imagen anterior": "Previous image",
    "Imagen siguiente": "Next image",
    "Navegación de galería": "Gallery navigation",
    "Alquileres administrados de forma privada": "Privately managed rentals",
    "Viviendas de alquiler de calidad con un proceso de solicitud simple y transparente.": "Quality rental homes with a simple and transparent application process.",
    "Katherine Riordan ofrece viviendas de alquiler administradas de forma privada, con enfoque en transparencia, comunicación receptiva y una experiencia de arrendamiento fluida.": "Katherine Riordan offers privately managed rental homes focused on transparency, responsive communication, and a smooth leasing experience.",
    "Procesamiento seguro de solicitudes": "Secure Application Processing",
    "Las solicitudes se procesan de forma segura mediante Zillow Rental Manager en colaboración con la propietaria.": "Applications are securely processed through Zillow Rental Manager in partnership with the property owner.",
    "Acerca de Katherine": "About Katherine",
    "Administración privada de alquileres con supervisión directa de la propietaria.": "Private rental management with direct owner oversight.",
    "Katherine Riordan es una administradora privada de propiedades dedicada a brindar apoyo de alquiler organizado, transparente y profesional tanto para propietarios como para posibles inquilinos.": "Katherine Riordan is a dedicated private property manager focused on providing organized, transparent, and professional rental support for both property owners and prospective tenants.",
    "Trabaja de cerca con los solicitantes durante todo el proceso de arrendamiento, ayudándoles a comprender los requisitos de solicitud, programar visitas a la propiedad y avanzar en cada paso con claridad y confianza.": "She works closely with applicants throughout the leasing process, helping them understand application requirements, schedule property tours, and navigate each step with clarity and confidence.",
    "Con un fuerte énfasis en la comunicación, la confiabilidad y el profesionalismo, Katherine se compromete a crear una experiencia de alquiler fluida, bien estructurada y respetuosa para todos los involucrados.": "With a strong emphasis on communication, reliability, and professionalism, Katherine is committed to creating a rental experience that feels smooth, well-structured, and respectful for everyone involved.",
    "Su enfoque se centra en la comunicación receptiva, expectativas transparentes y hacer que el proceso de alquiler sea lo más sencillo y libre de estrés posible.": "Her approach is centered around responsive communication, transparent expectations, and making the rental process as straightforward and stress-free as possible.",
    "Logo HOA": "HOA Logo",
    "Se respetan las pautas de la comunidad y la HOA": "Community & HOA Guidelines Respected",
    "Administrado en alineación con los estándares de la comunidad": "Managed in alignment with community standards",
    "Siguientes pasos simples": "Simple next steps",
    "Ver detalles de la propiedad": "View Property Details",
    "Revise la información disponible de la propiedad antes de aplicar.": "Review available property information before applying.",
    "Enviar Solicitud": "Submit Application",
    "Complete el formulario seguro de solicitud de alquiler.": "Complete the secure rental application form.",
    "Tarifa de solicitud reembolsable": "Refundable Application Fee",
    "Las tarifas de solicitud son reembolsables si la solicitud no es aprobada o si el solicitante decide no continuar después de la visita.": "Application fees are refundable if the application is not approved or the applicant chooses not to move forward after the tour.",
    "Siguientes pasos": "Next Steps",
    "Los solicitantes calificados recibirán actualizaciones, programación de visita e instrucciones adicionales.": "Qualified applicants will receive updates, tour scheduling, and further instructions.",
    "Preguntas frecuentes": "FAQ",
    "Preguntas sobre la solicitud de alquiler": "Rental application questions",
    "¿Cómo aplico para un alquiler?": "How do I apply for a rental?",
    "Puede aplicar directamente mediante el formulario seguro de solicitud de alquiler en este sitio web.": "You can apply directly through the secure rental application form on this website.",
    "¿Hay una tarifa de solicitud?": "Is there an application fee?",
    "Sí. Puede aplicarse una tarifa de solicitud reembolsable después de enviar la solicitud.": "Yes. A refundable application fee may apply after submitting the application.",
    "¿Los listados siempre están disponibles?": "Are listings always available?",
    "La disponibilidad puede cambiar en cualquier momento según la ocupación actual y el estado de las solicitudes.": "Availability may change at any time depending on current occupancy and application status.",
    "¿Cómo me contactarán?": "How will I be contacted?",
    "Normalmente se contacta a los solicitantes usando el número de teléfono o correo electrónico proporcionado en el formulario.": "Applicants are typically contacted using the phone number or email provided in the application form.",
    "Solicite orientación sobre disponibilidad, pasos de la solicitud, calendario de mudanza u otras consultas relacionadas con el alquiler antes de continuar.": "Request guidance regarding availability, application steps, move-in timing, or general rental questions before proceeding.",
    "Administradora de propiedades": "Property Manager",
    "Contacto directo": "Direct Contact",
    "Para consultas sobre alquiler o apoyo con su solicitud, comuníquese directamente con Katherine.": "For rental inquiries or application support, contact Katherine directly.",
    "Si tiene preguntas sobre el proceso de solicitud, comuníquese directamente con Katherine Riordan.": "If you have questions regarding the application process, please contact Katherine Riordan directly.",
    "Enviar correo electrónico a Katherine Riordan": "Email Katherine Riordan",
    "Llamar a Katherine Riordan": "Call Katherine Riordan",
    "© 2026 Katherine Riordan. Alquileres administrados de forma privada.": "© 2026 Katherine Riordan. Privately managed rentals.",
    "Solicitud segura de alquiler": "Secure rental application",
    "Formulario de Solicitud de Alquiler": "Rental Application Form",
    "Complete este formulario con precisión. Toda la información proporcionada permanecerá confidencial y se requiere únicamente para el proceso de aprobación de la solicitud de alquiler. Cada adulto (18+) que solicite vivir en la unidad debe completar una solicitud por separado.": "Please complete this form accurately. All information provided will remain confidential and is required solely for the rental application approval process. Each adult (18+) applying to live in the unit must complete a separate application.",
    "Este es un alquiler administrado de forma privada. Todas las solicitudes son revisadas directamente por la propietaria. No participan agentes externos.": "This is a privately managed rental. All applications are reviewed directly by the property owner. No third-party agents are involved.",
    "Este es un alquiler administrado de forma privada. Todas las solicitudes son revisadas directamente por la propietaria.": "This is a privately managed rental. All applications are reviewed directly by the property owner.",
    "Igualdad de oportunidad de vivienda": "Equal Housing Opportunity",
    "Solicitud segura con cifrado SSL": "Secure SSL Encrypted Application",
    "Proceso de solicitud respaldado mediante Zillow Rental Manager": "Application Process Supported Through Zillow Rental Manager",
    "Las solicitudes se envían de forma segura mediante Zillow Rental Manager en colaboración con la propietaria. No participan agentes de arrendamiento externos.": "Applications are securely submitted through Zillow Rental Manager in partnership with the property owner. No outside leasing agents are involved.",
    "Información de la propiedad": "Property Information",
    "Propiedad para la que aplica": "Property applying for",
    "Ingrese la dirección o el nombre del anuncio": "Enter property address or listing name",
    "Seleccione una propiedad": "Select a property",
    "Fecha deseada de mudanza": "Desired move-in date",
    "Información del solicitante": "Applicant Information",
    "Nombre legal completo": "Full legal name",
    "Correo electrónico": "Email address",
    "Número de teléfono": "Phone number",
    "Fecha de nacimiento": "Date of birth",
    "Historial de residencia": "Residency History",
    "Dirección actual": "Current address",
    "Propietario o administrador actual": "Current landlord or manager",
    "Teléfono del propietario o administrador": "Landlord phone number",
    "¿Cuánto tiempo ha vivido ahí?": "How long have you lived there?",
    "Empleo e ingresos": "Employment & Income",
    "Empleador o fuente de ingresos": "Employer or income source",
    "Puesto de trabajo": "Job title",
    "Ingreso mensual bruto": "Gross monthly income",
    "Teléfono del empleador": "Employer phone number",
    "Nombre del empleador": "Employer name",
    "Ingrese el nombre del empleador o empresa": "Enter employer or company name",
    "Preguntas de antecedentes": "Background Questions",
    "¿Alguna vez ha sido desalojado?": "Have you ever been evicted?",
    "Seleccione una respuesta": "Select an answer",
    "Sí": "Yes",
    "¿Ha declarado bancarrota en los últimos 7 años?": "Have you filed bankruptcy in the last 7 years?",
    "Si respondió sí a alguna pregunta, explique": "If yes to any question, please explain",
    "Información adicional": "Additional Information",
    "Ocupantes adicionales": "Additional occupants",
    "Mascotas": "Pets",
    "¿Algo más que desee compartir?": "Anything else you would like to share?",
    "Contacto de emergencia": "Emergency Contact",
    "Nombre del contacto de emergencia": "Emergency contact name",
    "Teléfono del contacto de emergencia": "Emergency contact phone",
    "Relación": "Relationship",
    "Acuerdo": "Agreement",
    "Certifico que la información proporcionada es verdadera y completa a mi leal saber y entender.": "I certify that the information provided is true and complete to the best of my knowledge.",
    "Solicitud recibida": "Application received",
    "Gracias. Su solicitud ha sido enviada.": "Thank you. Your application has been submitted.",
    "Su solicitud aparece como recibida. Revise su correo electrónico o teléfono para actualizaciones de Katherine sobre el estado de revisión, programación de visita o instrucciones de siguientes pasos.": "Your application is marked as received. Please watch your email or phone for updates from Katherine about review status, tour scheduling, or next-step instructions.",
    "Estado: Recibida": "Status: Received",
    "Las solicitudes son revisadas directamente por la propietaria. Se le contactará si se necesita más información.": "Applications are reviewed directly by the property owner. You will be contacted if more information is needed.",
    "Nota de procesamiento seguro": "Secure processing note",
    "Los detalles de la solicitud pueden procesarse mediante Zillow Rental Manager en colaboración con la propietaria.": "Application details may be processed through Zillow Rental Manager in partnership with the property owner.",
    "Volver al inicio": "Return Home",
    "Contactar a Katherine": "Contact Katherine",
    "Ejemplo: 2 años": "Example: 2 years",
    "Nombres y relación con el solicitante": "Names and relationship to applicant",
    "Tipo, raza": "Type, breed",
    "Tipo, raza, peso y edad": "Type, breed, weight, and age"
  };

  Object.assign(aliases, {
    "Cómo funciona el proceso de alquiler": "How the Rental Process Works",
    "Revise cuidadosamente la información disponible de la propiedad antes de comenzar el proceso de solicitud.": "Review the available property information carefully before beginning the application process.",
    "Complete el formulario de solicitud de alquiler con información precisa.": "Complete the rental application form with accurate information.",
    "Pago de tarifa de solicitud reembolsable": "Refundable Application Fee Payment",
    "Una tarifa de solicitud reembolsable es un pago que se le devolverá si su solicitud no es aprobada o si decide no continuar después de la visita.": "A refundable application fee is a payment that will be returned to you if your application is not approved or if you decide not to move forward after the tour.",
    "Los solicitantes calificados serán contactados con actualizaciones, detalles de la visita o instrucciones adicionales.": "Qualified applicants will be contacted with updates, tour details, or further instructions.",
    "Preguntas frecuentes sobre el proceso de alquiler": "Rental Process FAQ",
    "Puede aplicar completando el formulario de solicitud de alquiler en este sitio web.": "You can apply by completing the rental application form on this website.",
    "Sí, hay una tarifa de solicitud reembolsable de $75, que se paga a través de Chime después de enviar su solicitud.": "Yes, there is a refundable application fee of $75, which is paid through Chime after your application is submitted.",
    "No siempre. La disponibilidad de alquiler puede cambiar en cualquier momento.": "Not always. Rental availability may change at any time.",
    "¿Cómo me contactarán después de aplicar?": "How will I be contacted after applying?",
    "Normalmente se contacta a los solicitantes usando el correo electrónico o número de teléfono proporcionado en el formulario de solicitud.": "Applicants are typically contacted using the email address or phone number provided in the application form.",
    "Privado": "Private",
    "Solicitudes revisadas por la propietaria": "Owner-reviewed applications",
    "Seguro": "Secure",
    "Procesamiento asistido por Zillow": "Zillow-assisted processing",
    "Claro": "Clear",
    "Actualizaciones directas de siguientes pasos": "Direct next-step updates",
  });

  const optionLabels = {
    en: ["English", "Español", "中文", "Français", "Português", "العربية"],
    es: ["English", "Español", "中文", "Français", "Português", "العربية"],
    zh: ["English", "Español", "中文", "Français", "Português", "العربية"],
    fr: ["English", "Español", "中文", "Français", "Português", "العربية"],
    pt: ["English", "Español", "中文", "Français", "Português", "العربية"],
    ar: ["English", "Español", "中文", "Français", "Português", "العربية"]
  };

  const premiumTranslations = {
    es: {
      "How the Rental Process Works": "Cómo funciona el proceso de alquiler",
      "Review the available property information carefully before beginning the application process.": "Revise cuidadosamente la información disponible de la propiedad antes de comenzar el proceso de solicitud.",
      "Complete the rental application form with accurate information.": "Complete el formulario de solicitud de alquiler con información precisa.",
      "Refundable Application Fee Payment": "Pago de tarifa de solicitud reembolsable",
      "A refundable application fee is a payment that will be returned to you if your application is not approved or if you decide not to move forward after the tour.": "Una tarifa de solicitud reembolsable es un pago que se le devolverá si su solicitud no es aprobada o si decide no continuar después de la visita.",
      "Qualified applicants will be contacted with updates, tour details, or further instructions.": "Los solicitantes calificados serán contactados con actualizaciones, detalles de la visita o instrucciones adicionales.",
      "Rental Process FAQ": "Preguntas frecuentes sobre el proceso de alquiler",
      "You can apply by completing the rental application form on this website.": "Puede aplicar completando el formulario de solicitud de alquiler en este sitio web.",
      "Yes, there is a refundable application fee of $75, which is paid through Chime after your application is submitted.": "Sí, hay una tarifa de solicitud reembolsable de $75, que se paga a través de Chime después de enviar su solicitud.",
      "Not always. Rental availability may change at any time.": "No siempre. La disponibilidad de alquiler puede cambiar en cualquier momento.",
      "How will I be contacted after applying?": "¿Cómo me contactarán después de aplicar?",
      "Applicants are typically contacted using the email address or phone number provided in the application form.": "Normalmente se contacta a los solicitantes usando el correo electrónico o número de teléfono proporcionado en el formulario de solicitud.",
      "Private": "Privado",
      "Owner-reviewed applications": "Solicitudes revisadas por la propietaria",
      "Secure": "Seguro",
      "Zillow-assisted processing": "Procesamiento asistido por Zillow",
      "Clear": "Claro",
      "Direct next-step updates": "Actualizaciones directas de siguientes pasos",
    },
    zh: {
      "How the Rental Process Works": "租赁流程如何运作",
      "Review the available property information carefully before beginning the application process.": "开始申请前，请仔细查看可用的房源信息。",
      "Complete the rental application form with accurate information.": "请用准确的信息填写租赁申请表。",
      "Refundable Application Fee Payment": "可退还申请费付款",
      "A refundable application fee is a payment that will be returned to you if your application is not approved or if you decide not to move forward after the tour.": "可退还申请费是指如果您的申请未获批准，或您看房后决定不继续，该费用将退还给您。",
      "Qualified applicants will be contacted with updates, tour details, or further instructions.": "符合条件的申请人将收到更新、看房详情或进一步说明。",
      "Rental Process FAQ": "租赁流程常见问题",
      "You can apply by completing the rental application form on this website.": "您可以在本网站填写租赁申请表进行申请。",
      "Yes, there is a refundable application fee of $75, which is paid through Chime after your application is submitted.": "是的，申请提交后需通过 Chime 支付 75 美元的可退还申请费。",
      "Not always. Rental availability may change at any time.": "不一定。出租房源可用情况可能随时变化。",
      "How will I be contacted after applying?": "申请后会如何联系我？",
      "Applicants are typically contacted using the email address or phone number provided in the application form.": "通常会使用申请表中提供的电子邮件地址或电话号码联系申请人。",
      "Private": "私人",
      "Owner-reviewed applications": "业主审核申请",
      "Secure": "安全",
      "Zillow-assisted processing": "Zillow 协助处理",
      "Clear": "清晰",
      "Direct next-step updates": "直接的后续更新",
    },
    fr: {
      "How the Rental Process Works": "Comment fonctionne le processus de location",
      "Review the available property information carefully before beginning the application process.": "Consultez attentivement les informations disponibles sur le bien avant de commencer la demande.",
      "Complete the rental application form with accurate information.": "Remplissez le formulaire de demande de location avec des informations exactes.",
      "Refundable Application Fee Payment": "Paiement des frais de demande remboursables",
      "A refundable application fee is a payment that will be returned to you if your application is not approved or if you decide not to move forward after the tour.": "Des frais de demande remboursables sont un paiement qui vous sera retourné si votre demande n’est pas approuvée ou si vous décidez de ne pas poursuivre après la visite.",
      "Qualified applicants will be contacted with updates, tour details, or further instructions.": "Les candidats qualifiés seront contactés avec des mises à jour, les détails de visite ou des instructions supplémentaires.",
      "Rental Process FAQ": "FAQ du processus de location",
      "You can apply by completing the rental application form on this website.": "Vous pouvez postuler en remplissant le formulaire de demande de location sur ce site.",
      "Yes, there is a refundable application fee of $75, which is paid through Chime after your application is submitted.": "Oui, des frais de demande remboursables de 75 $ sont payés via Chime après l’envoi de votre demande.",
      "Not always. Rental availability may change at any time.": "Pas toujours. La disponibilité des locations peut changer à tout moment.",
      "How will I be contacted after applying?": "Comment serai-je contacté après avoir postulé ?",
      "Applicants are typically contacted using the email address or phone number provided in the application form.": "Les candidats sont généralement contactés à l’adresse e-mail ou au numéro de téléphone fournis dans le formulaire.",
      "Private": "Privé",
      "Owner-reviewed applications": "Demandes examinées par la propriétaire",
      "Secure": "Sécurisé",
      "Zillow-assisted processing": "Traitement assisté par Zillow",
      "Clear": "Clair",
      "Direct next-step updates": "Mises à jour directes",
    },
    pt: {
      "How the Rental Process Works": "Como funciona o processo de aluguel",
      "Review the available property information carefully before beginning the application process.": "Revise cuidadosamente as informações disponíveis do imóvel antes de iniciar o processo de solicitação.",
      "Complete the rental application form with accurate information.": "Preencha o formulário de solicitação de aluguel com informações precisas.",
      "Refundable Application Fee Payment": "Pagamento da taxa de solicitação reembolsável",
      "A refundable application fee is a payment that will be returned to you if your application is not approved or if you decide not to move forward after the tour.": "Uma taxa de solicitação reembolsável é um pagamento que será devolvido se sua solicitação não for aprovada ou se você decidir não prosseguir após a visita.",
      "Qualified applicants will be contacted with updates, tour details, or further instructions.": "Candidatos qualificados serão contatados com atualizações, detalhes da visita ou instruções adicionais.",
      "Rental Process FAQ": "Perguntas sobre o processo de aluguel",
      "You can apply by completing the rental application form on this website.": "Você pode aplicar preenchendo o formulário de solicitação de aluguel neste site.",
      "Yes, there is a refundable application fee of $75, which is paid through Chime after your application is submitted.": "Sim, há uma taxa de solicitação reembolsável de $75, paga pelo Chime após o envio da solicitação.",
      "Not always. Rental availability may change at any time.": "Nem sempre. A disponibilidade de aluguel pode mudar a qualquer momento.",
      "How will I be contacted after applying?": "Como serei contatado após aplicar?",
      "Applicants are typically contacted using the email address or phone number provided in the application form.": "Os candidatos geralmente são contatados pelo e-mail ou telefone fornecido no formulário de solicitação.",
      "Private": "Privado",
      "Owner-reviewed applications": "Solicitações revisadas pela proprietária",
      "Secure": "Seguro",
      "Zillow-assisted processing": "Processamento assistido pelo Zillow",
      "Clear": "Claro",
      "Direct next-step updates": "Atualizações diretas dos próximos passos",
    },
    ar: {
      "How the Rental Process Works": "كيف تعمل عملية الإيجار",
      "Review the available property information carefully before beginning the application process.": "راجع معلومات العقار المتاحة بعناية قبل بدء عملية التقديم.",
      "Complete the rental application form with accurate information.": "أكمل نموذج طلب الإيجار بمعلومات دقيقة.",
      "Refundable Application Fee Payment": "دفع رسوم طلب قابلة للاسترداد",
      "A refundable application fee is a payment that will be returned to you if your application is not approved or if you decide not to move forward after the tour.": "رسوم الطلب القابلة للاسترداد هي دفعة ستعاد إليك إذا لم تتم الموافقة على طلبك أو إذا قررت عدم المتابعة بعد الجولة.",
      "Qualified applicants will be contacted with updates, tour details, or further instructions.": "سيتم التواصل مع المتقدمين المؤهلين بالتحديثات أو تفاصيل الجولة أو التعليمات الإضافية.",
      "Rental Process FAQ": "الأسئلة الشائعة حول عملية الإيجار",
      "You can apply by completing the rental application form on this website.": "يمكنك التقديم من خلال إكمال نموذج طلب الإيجار على هذا الموقع.",
      "Yes, there is a refundable application fee of $75, which is paid through Chime after your application is submitted.": "نعم، توجد رسوم طلب قابلة للاسترداد بقيمة 75 دولاراً تُدفع عبر Chime بعد إرسال طلبك.",
      "Not always. Rental availability may change at any time.": "ليس دائماً. قد يتغير توافر الإيجار في أي وقت.",
      "How will I be contacted after applying?": "كيف سيتم التواصل معي بعد التقديم؟",
      "Applicants are typically contacted using the email address or phone number provided in the application form.": "عادة يتم التواصل مع المتقدمين عبر البريد الإلكتروني أو رقم الهاتف المقدم في نموذج الطلب.",
      "Private": "خاص",
      "Owner-reviewed applications": "طلبات تراجعها المالكة",
      "Secure": "آمن",
      "Zillow-assisted processing": "معالجة بمساعدة Zillow",
      "Clear": "واضح",
      "Direct next-step updates": "تحديثات مباشرة للخطوات التالية",
    }
  };

  Object.keys(premiumTranslations).forEach((language) => {
    Object.assign(translations[language], premiumTranslations[language]);
  });

  const validationTranslations = {
    es: {
      "Please complete this required field.": "Complete este campo obligatorio.",
      "Please enter a valid email address.": "Ingrese una dirección de correo electrónico válida.",
      "Please check this box to continue.": "Marque esta casilla para continuar."
    },
    zh: {
      "Please complete this required field.": "请填写此必填字段。",
      "Please enter a valid email address.": "请输入有效的电子邮件地址。",
      "Please check this box to continue.": "请勾选此框以继续。"
    },
    fr: {
      "Please complete this required field.": "Veuillez remplir ce champ obligatoire.",
      "Please enter a valid email address.": "Veuillez saisir une adresse e-mail valide.",
      "Please check this box to continue.": "Veuillez cocher cette case pour continuer."
    },
    pt: {
      "Please complete this required field.": "Preencha este campo obrigatório.",
      "Please enter a valid email address.": "Informe um endereço de e-mail válido.",
      "Please check this box to continue.": "Marque esta caixa para continuar."
    },
    ar: {
      "Please complete this required field.": "يرجى إكمال هذا الحقل المطلوب.",
      "Please enter a valid email address.": "يرجى إدخال عنوان بريد إلكتروني صالح.",
      "Please check this box to continue.": "يرجى تحديد هذا المربع للمتابعة."
    }
  };

  Object.keys(validationTranslations).forEach((language) => {
    Object.assign(translations[language], validationTranslations[language]);
  });

  const postFlowTranslations = {
    es: {
      "Submission Received": "Solicitud recibida",
      "Application Received Successfully": "Solicitud recibida correctamente",
      "Thank you for completing your rental application. Your information has been received successfully and is currently pending review.": "Gracias por completar su solicitud de alquiler. Su información se recibió correctamente y está pendiente de revisión.",
      "Application ID:": "ID de solicitud:",
      "Email Confirmation": "Confirmación por correo electrónico",
      "A confirmation email will be sent shortly to the email address provided in your application. That email will confirm that your application has been received.": "Pronto se enviará un correo de confirmación a la dirección proporcionada en su solicitud. Ese correo confirmará que su solicitud fue recibida.",
      "Secure & Verified Process": "Proceso seguro y verificado",
      "This application process is handled directly by the property management team. All submitted applications are reviewed carefully, and payment confirmations are documented for transparency and record keeping.": "Este proceso de solicitud es gestionado directamente por el equipo de administración de la propiedad. Todas las solicitudes enviadas se revisan cuidadosamente y las confirmaciones de pago se documentan para transparencia y registro.",
      "Fee Transparency": "Transparencia de tarifas",
      "The application fee is refundable if your application is not approved or if you decide not to proceed after the tour. If approved and you choose to move forward, the fee is applied toward your first month's rent.": "La tarifa de solicitud es reembolsable si su solicitud no es aprobada o si decide no continuar después de la visita. Si se aprueba y decide seguir adelante, la tarifa se aplica al primer mes de renta.",
      "Chime Payment Information": "Información de pago por Chime",
      "Payment Method:": "Método de pago:",
      "Account Name:": "Nombre de la cuenta:",
      "Chime Tag / Username:": "Etiqueta/usuario de Chime:",
      "Application Fee:": "Tarifa de solicitud:",
      "Reference Note:": "Nota de referencia:",
      "Provide a screenshot of the payment confirmation via email or text.": "Proporcione una captura de pantalla de la confirmación de pago por correo electrónico o mensaje de texto.",
      "Payment should be sent only through the official Chime information provided on this page. Keep your payment confirmation for your records.": "El pago debe enviarse únicamente mediante la información oficial de Chime proporcionada en esta página. Conserve su confirmación de pago para sus registros.",
      "I have completed the application fee payment": "He completado el pago de la tarifa de solicitud",
      "Continue To Payment Confirmation": "Continuar a la confirmación de pago",
      "Don't Have Chime?": "¿No tiene Chime?",
      "No problem. You can create a Chime account first, then return to complete the application fee payment using the official details above.": "No hay problema. Puede crear una cuenta de Chime primero y luego regresar para completar el pago usando los datos oficiales anteriores.",
      "Download on the": "Descárguelo en",
      "Get it on": "Disponible en",
      "How to Set Up a Chime Account": "Cómo configurar una cuenta de Chime",
      "Click the App Store or Google Play link above.": "Haga clic en el enlace de App Store o Google Play anterior.",
      "Download and install the Chime app.": "Descargue e instale la aplicación Chime.",
      "Open the app and choose to create a new account.": "Abra la aplicación y elija crear una cuenta nueva.",
      "Enter your personal details and complete the signup process.": "Ingrese sus datos personales y complete el proceso de registro.",
      "Verify your identity if prompted by the app.": "Verifique su identidad si la aplicación se lo solicita.",
      "Once your account is ready, return to this page and use the payment details provided.": "Cuando su cuenta esté lista, regrese a esta página y use los datos de pago proporcionados.",
      "Need Help or Want to Verify?": "¿Necesita ayuda o desea verificar?",
      "For any questions, clarification, or verification regarding the application process, you can contact Katherine directly using the information below.": "Para preguntas, aclaraciones o verificación sobre el proceso de solicitud, puede contactar directamente a Katherine usando la información siguiente.",
      "Email:": "Correo electrónico:",
      "Phone:": "Teléfono:",
      "You can also review the main property management website for additional information.": "También puede revisar el sitio principal de administración de propiedades para obtener información adicional.",
      "We support fair and equal housing practices for all applicants in accordance with applicable housing guidelines and nondiscrimination standards.": "Apoyamos prácticas de vivienda justas e igualitarias para todos los solicitantes, de acuerdo con las pautas de vivienda aplicables y las normas contra la discriminación.",
      "Upload Payment Confirmation": "Subir confirmación de pago",
      "Please upload your payment screenshot to complete your secure application verification.": "Suba la captura de pantalla de su pago para completar la verificación segura de su solicitud.",
      "Applicant details": "Datos del solicitante",
      "Full Name": "Nombre completo",
      "Email Address": "Correo electrónico",
      "Application ID (optional)": "ID de solicitud (opcional)",
      "Tap to upload": "Toque para subir",
      "or drag and drop your payment screenshot here.": "o arrastre y suelte aquí la captura de pantalla del pago.",
      "JPG, JPEG or PNG only": "Solo JPG, JPEG o PNG",
      "Selected File": "Archivo seleccionado",
      "Submit Payment Confirmation": "Enviar confirmación de pago",
      "Prefer Email Confirmation?": "¿Prefiere confirmar por correo?",
      "If you would prefer to email your payment confirmation instead, send it directly to Katherine for processing.": "Si prefiere enviar la confirmación de pago por correo, envíela directamente a Katherine para su procesamiento.",
      "Send Email Confirmation": "Enviar confirmación por correo",
      "Payment Confirmation Submitted": "Confirmación de pago enviada",
      "Your payment screenshot has been received and is pending private verification. Katherine will review your confirmation with your application details.": "Su captura de pantalla del pago fue recibida y está pendiente de verificación privada. Katherine revisará su confirmación junto con los detalles de su solicitud.",
      "Please select a payment screenshot before submitting.": "Seleccione una captura de pantalla del pago antes de enviar.",
      "Please upload a JPG, JPEG, or PNG file.": "Suba un archivo JPG, JPEG o PNG.",
      "File size must be less than 10MB.": "El archivo debe pesar menos de 10 MB.",
      "Remove": "Quitar"
    },
    fr: {
      "Submission Received": "Demande reçue",
      "Application Received Successfully": "Demande reçue avec succès",
      "Thank you for completing your rental application. Your information has been received successfully and is currently pending review.": "Merci d’avoir rempli votre demande de location. Vos informations ont bien été reçues et sont actuellement en cours d’examen.",
      "Application ID:": "ID de demande :",
      "Email Confirmation": "Confirmation par e-mail",
      "A confirmation email will be sent shortly to the email address provided in your application. That email will confirm that your application has been received.": "Un e-mail de confirmation sera envoyé prochainement à l’adresse indiquée dans votre demande. Il confirmera la bonne réception de votre dossier.",
      "Secure & Verified Process": "Processus sécurisé et vérifié",
      "This application process is handled directly by the property management team. All submitted applications are reviewed carefully, and payment confirmations are documented for transparency and record keeping.": "Ce processus de demande est géré directement par l’équipe de gestion immobilière. Toutes les demandes sont examinées avec soin et les confirmations de paiement sont consignées à des fins de transparence et de suivi.",
      "Fee Transparency": "Transparence des frais",
      "The application fee is refundable if your application is not approved or if you decide not to proceed after the tour. If approved and you choose to move forward, the fee is applied toward your first month's rent.": "Les frais de demande sont remboursables si votre dossier n’est pas approuvé ou si vous décidez de ne pas poursuivre après la visite. Si votre demande est approuvée et que vous continuez, ces frais sont appliqués au premier mois de loyer.",
      "Chime Payment Information": "Informations de paiement Chime",
      "Payment Method:": "Mode de paiement :",
      "Account Name:": "Nom du compte :",
      "Chime Tag / Username:": "Identifiant Chime :",
      "Application Fee:": "Frais de demande :",
      "Reference Note:": "Note de référence :",
      "Provide a screenshot of the payment confirmation via email or text.": "Veuillez fournir une capture d’écran de la confirmation de paiement par e-mail ou message texte.",
      "Payment should be sent only through the official Chime information provided on this page. Keep your payment confirmation for your records.": "Le paiement doit être envoyé uniquement avec les informations Chime officielles indiquées sur cette page. Conservez votre confirmation de paiement dans vos dossiers.",
      "I have completed the application fee payment": "J’ai effectué le paiement des frais de demande",
      "Continue To Payment Confirmation": "Continuer vers la confirmation de paiement",
      "Don't Have Chime?": "Vous n’avez pas Chime ?",
      "No problem. You can create a Chime account first, then return to complete the application fee payment using the official details above.": "Aucun problème. Vous pouvez d’abord créer un compte Chime, puis revenir ici pour effectuer le paiement avec les informations officielles ci-dessus.",
      "Download on the": "Télécharger sur",
      "Get it on": "Disponible sur",
      "How to Set Up a Chime Account": "Comment créer un compte Chime",
      "Click the App Store or Google Play link above.": "Cliquez sur le lien App Store ou Google Play ci-dessus.",
      "Download and install the Chime app.": "Téléchargez et installez l’application Chime.",
      "Open the app and choose to create a new account.": "Ouvrez l’application et choisissez de créer un nouveau compte.",
      "Enter your personal details and complete the signup process.": "Saisissez vos informations personnelles et terminez l’inscription.",
      "Verify your identity if prompted by the app.": "Vérifiez votre identité si l’application vous le demande.",
      "Once your account is ready, return to this page and use the payment details provided.": "Une fois votre compte prêt, revenez sur cette page et utilisez les informations de paiement fournies.",
      "Need Help or Want to Verify?": "Besoin d’aide ou de vérifier ?",
      "For any questions, clarification, or verification regarding the application process, you can contact Katherine directly using the information below.": "Pour toute question, précision ou vérification concernant le processus de demande, vous pouvez contacter Katherine directement avec les coordonnées ci-dessous.",
      "Email:": "E-mail :",
      "Phone:": "Téléphone :",
      "You can also review the main property management website for additional information.": "Vous pouvez également consulter le site principal de gestion immobilière pour plus d’informations.",
      "We support fair and equal housing practices for all applicants in accordance with applicable housing guidelines and nondiscrimination standards.": "Nous soutenons des pratiques de logement équitables pour tous les candidats, conformément aux directives applicables et aux normes de non-discrimination.",
      "Upload Payment Confirmation": "Téléverser la confirmation de paiement",
      "Please upload your payment screenshot to complete your secure application verification.": "Veuillez téléverser la capture d’écran de votre paiement afin de terminer la vérification sécurisée de votre demande.",
      "Applicant details": "Renseignements du candidat",
      "Full Name": "Nom complet",
      "Email Address": "Adresse e-mail",
      "Application ID (optional)": "ID de demande (facultatif)",
      "Tap to upload": "Touchez pour téléverser",
      "or drag and drop your payment screenshot here.": "ou glissez-déposez votre capture d’écran de paiement ici.",
      "JPG, JPEG or PNG only": "JPG, JPEG ou PNG uniquement",
      "Selected File": "Fichier sélectionné",
      "Submit Payment Confirmation": "Envoyer la confirmation de paiement",
      "Prefer Email Confirmation?": "Vous préférez confirmer par e-mail ?",
      "If you would prefer to email your payment confirmation instead, send it directly to Katherine for processing.": "Si vous préférez envoyer votre confirmation de paiement par e-mail, adressez-la directement à Katherine pour traitement.",
      "Send Email Confirmation": "Envoyer la confirmation par e-mail",
      "Payment Confirmation Submitted": "Confirmation de paiement envoyée",
      "Your payment screenshot has been received and is pending private verification. Katherine will review your confirmation with your application details.": "Votre capture d’écran de paiement a été reçue et est en attente de vérification privée. Katherine l’examinera avec les détails de votre demande.",
      "Please select a payment screenshot before submitting.": "Veuillez sélectionner une capture d’écran du paiement avant d’envoyer.",
      "Please upload a JPG, JPEG, or PNG file.": "Veuillez téléverser un fichier JPG, JPEG ou PNG.",
      "File size must be less than 10MB.": "Le fichier doit faire moins de 10 Mo.",
      "Remove": "Retirer"
    },
    pt: {
      "Submission Received": "Solicitação recebida",
      "Application Received Successfully": "Solicitação recebida com sucesso",
      "Thank you for completing your rental application. Your information has been received successfully and is currently pending review.": "Obrigado por preencher sua solicitação de aluguel. Suas informações foram recebidas com sucesso e estão pendentes de análise.",
      "Application ID:": "ID da solicitação:",
      "Email Confirmation": "Confirmação por e-mail",
      "A confirmation email will be sent shortly to the email address provided in your application. That email will confirm that your application has been received.": "Um e-mail de confirmação será enviado em breve para o endereço informado na solicitação. Esse e-mail confirmará que sua solicitação foi recebida.",
      "Secure & Verified Process": "Processo seguro e verificado",
      "This application process is handled directly by the property management team. All submitted applications are reviewed carefully, and payment confirmations are documented for transparency and record keeping.": "Este processo de solicitação é conduzido diretamente pela equipe de administração da propriedade. Todas as solicitações enviadas são analisadas com cuidado, e as confirmações de pagamento são documentadas para transparência e registro.",
      "Fee Transparency": "Transparência da taxa",
      "The application fee is refundable if your application is not approved or if you decide not to proceed after the tour. If approved and you choose to move forward, the fee is applied toward your first month's rent.": "A taxa de solicitação é reembolsável se sua solicitação não for aprovada ou se você decidir não prosseguir após a visita. Se aprovada e você optar por continuar, a taxa será aplicada ao primeiro mês de aluguel.",
      "Chime Payment Information": "Informações de pagamento pelo Chime",
      "Payment Method:": "Forma de pagamento:",
      "Account Name:": "Nome da conta:",
      "Chime Tag / Username:": "Tag/usuário do Chime:",
      "Application Fee:": "Taxa de solicitação:",
      "Reference Note:": "Observação de referência:",
      "Provide a screenshot of the payment confirmation via email or text.": "Envie uma captura de tela da confirmação de pagamento por e-mail ou mensagem de texto.",
      "Payment should be sent only through the official Chime information provided on this page. Keep your payment confirmation for your records.": "O pagamento deve ser enviado somente pelas informações oficiais do Chime fornecidas nesta página. Guarde sua confirmação de pagamento para seus registros.",
      "I have completed the application fee payment": "Concluí o pagamento da taxa de solicitação",
      "Continue To Payment Confirmation": "Continuar para a confirmação de pagamento",
      "Don't Have Chime?": "Não tem Chime?",
      "No problem. You can create a Chime account first, then return to complete the application fee payment using the official details above.": "Sem problema. Você pode criar uma conta Chime primeiro e depois voltar para concluir o pagamento usando os dados oficiais acima.",
      "Download on the": "Baixar na",
      "Get it on": "Disponível no",
      "How to Set Up a Chime Account": "Como criar uma conta Chime",
      "Click the App Store or Google Play link above.": "Clique no link da App Store ou do Google Play acima.",
      "Download and install the Chime app.": "Baixe e instale o aplicativo Chime.",
      "Open the app and choose to create a new account.": "Abra o aplicativo e escolha criar uma nova conta.",
      "Enter your personal details and complete the signup process.": "Informe seus dados pessoais e conclua o cadastro.",
      "Verify your identity if prompted by the app.": "Verifique sua identidade se o aplicativo solicitar.",
      "Once your account is ready, return to this page and use the payment details provided.": "Quando sua conta estiver pronta, volte a esta página e use os dados de pagamento fornecidos.",
      "Need Help or Want to Verify?": "Precisa de ajuda ou deseja verificar?",
      "For any questions, clarification, or verification regarding the application process, you can contact Katherine directly using the information below.": "Para dúvidas, esclarecimentos ou verificação sobre o processo de solicitação, entre em contato diretamente com Katherine usando as informações abaixo.",
      "Email:": "E-mail:",
      "Phone:": "Telefone:",
      "You can also review the main property management website for additional information.": "Você também pode consultar o site principal de administração de propriedades para obter mais informações.",
      "We support fair and equal housing practices for all applicants in accordance with applicable housing guidelines and nondiscrimination standards.": "Apoiamos práticas justas e igualitárias de moradia para todos os candidatos, de acordo com as diretrizes habitacionais aplicáveis e normas de não discriminação.",
      "Upload Payment Confirmation": "Enviar confirmação de pagamento",
      "Please upload your payment screenshot to complete your secure application verification.": "Envie a captura de tela do pagamento para concluir a verificação segura da sua solicitação.",
      "Applicant details": "Dados do candidato",
      "Full Name": "Nome completo",
      "Email Address": "E-mail",
      "Application ID (optional)": "ID da solicitação (opcional)",
      "Tap to upload": "Toque para enviar",
      "or drag and drop your payment screenshot here.": "ou arraste e solte aqui a captura de tela do pagamento.",
      "JPG, JPEG or PNG only": "Somente JPG, JPEG ou PNG",
      "Selected File": "Arquivo selecionado",
      "Submit Payment Confirmation": "Enviar confirmação de pagamento",
      "Prefer Email Confirmation?": "Prefere confirmar por e-mail?",
      "If you would prefer to email your payment confirmation instead, send it directly to Katherine for processing.": "Se preferir enviar a confirmação de pagamento por e-mail, envie diretamente para Katherine para processamento.",
      "Send Email Confirmation": "Enviar confirmação por e-mail",
      "Payment Confirmation Submitted": "Confirmação de pagamento enviada",
      "Your payment screenshot has been received and is pending private verification. Katherine will review your confirmation with your application details.": "Sua captura de tela do pagamento foi recebida e está pendente de verificação privada. Katherine analisará sua confirmação junto com os detalhes da solicitação.",
      "Please select a payment screenshot before submitting.": "Selecione uma captura de tela do pagamento antes de enviar.",
      "Please upload a JPG, JPEG, or PNG file.": "Envie um arquivo JPG, JPEG ou PNG.",
      "File size must be less than 10MB.": "O arquivo deve ter menos de 10 MB.",
      "Remove": "Remover"
    },
    zh: {
      "Submission Received": "申请已收到",
      "Application Received Successfully": "申请已成功收到",
      "Thank you for completing your rental application. Your information has been received successfully and is currently pending review.": "感谢您完成租赁申请。您的信息已成功收到，目前正在等待审核。",
      "Application ID:": "申请编号：",
      "Email Confirmation": "电子邮件确认",
      "A confirmation email will be sent shortly to the email address provided in your application. That email will confirm that your application has been received.": "确认邮件将很快发送到您在申请中提供的电子邮箱。该邮件将确认您的申请已收到。",
      "Secure & Verified Process": "安全且已验证的流程",
      "This application process is handled directly by the property management team. All submitted applications are reviewed carefully, and payment confirmations are documented for transparency and record keeping.": "此申请流程由物业管理团队直接处理。所有提交的申请都会被认真审核，付款确认也会被记录，以便透明管理和留档。",
      "Fee Transparency": "费用透明",
      "The application fee is refundable if your application is not approved or if you decide not to proceed after the tour. If approved and you choose to move forward, the fee is applied toward your first month's rent.": "如果您的申请未获批准，或您看房后决定不继续，申请费可退还。如果申请获批且您选择继续，该费用将用于抵扣首月租金。",
      "Chime Payment Information": "Chime 付款信息",
      "Payment Method:": "付款方式：",
      "Account Name:": "账户名称：",
      "Chime Tag / Username:": "Chime 标签/用户名：",
      "Application Fee:": "申请费：",
      "Reference Note:": "备注说明：",
      "Provide a screenshot of the payment confirmation via email or text.": "请通过电子邮件或短信提供付款确认截图。",
      "Payment should be sent only through the official Chime information provided on this page. Keep your payment confirmation for your records.": "付款只能通过本页提供的官方 Chime 信息发送。请保存付款确认记录。",
      "I have completed the application fee payment": "我已完成申请费付款",
      "Continue To Payment Confirmation": "继续提交付款确认",
      "Don't Have Chime?": "没有 Chime？",
      "No problem. You can create a Chime account first, then return to complete the application fee payment using the official details above.": "没关系。您可以先创建 Chime 账户，然后返回此页面，使用上方官方信息完成申请费付款。",
      "Download on the": "下载于",
      "Get it on": "获取于",
      "How to Set Up a Chime Account": "如何设置 Chime 账户",
      "Click the App Store or Google Play link above.": "点击上方的 App Store 或 Google Play 链接。",
      "Download and install the Chime app.": "下载并安装 Chime 应用。",
      "Open the app and choose to create a new account.": "打开应用并选择创建新账户。",
      "Enter your personal details and complete the signup process.": "输入您的个人信息并完成注册流程。",
      "Verify your identity if prompted by the app.": "如果应用提示，请验证您的身份。",
      "Once your account is ready, return to this page and use the payment details provided.": "账户准备好后，请返回此页面并使用提供的付款信息。",
      "Need Help or Want to Verify?": "需要帮助或想要核实？",
      "For any questions, clarification, or verification regarding the application process, you can contact Katherine directly using the information below.": "如需咨询、说明或核实申请流程，您可以使用以下信息直接联系 Katherine。",
      "Email:": "电子邮件：",
      "Phone:": "电话：",
      "You can also review the main property management website for additional information.": "您也可以查看主物业管理网站以获取更多信息。",
      "We support fair and equal housing practices for all applicants in accordance with applicable housing guidelines and nondiscrimination standards.": "我们支持面向所有申请人的公平平等住房实践，并遵守适用的住房指南和反歧视标准。",
      "Upload Payment Confirmation": "上传付款确认",
      "Please upload your payment screenshot to complete your secure application verification.": "请上传您的付款截图，以完成安全的申请验证。",
      "Applicant details": "申请人信息",
      "Full Name": "全名",
      "Email Address": "电子邮件地址",
      "Application ID (optional)": "申请编号（可选）",
      "Tap to upload": "点击上传",
      "or drag and drop your payment screenshot here.": "或将付款截图拖放到此处。",
      "JPG, JPEG or PNG only": "仅支持 JPG、JPEG 或 PNG",
      "Selected File": "已选择文件",
      "Submit Payment Confirmation": "提交付款确认",
      "Prefer Email Confirmation?": "更愿意通过电子邮件确认？",
      "If you would prefer to email your payment confirmation instead, send it directly to Katherine for processing.": "如果您更愿意通过电子邮件发送付款确认，请直接发送给 Katherine 处理。",
      "Send Email Confirmation": "发送电子邮件确认",
      "Payment Confirmation Submitted": "付款确认已提交",
      "Your payment screenshot has been received and is pending private verification. Katherine will review your confirmation with your application details.": "您的付款截图已收到，目前等待私下核验。Katherine 将结合您的申请详情审核该确认。",
      "Please select a payment screenshot before submitting.": "提交前请选择付款截图。",
      "Please upload a JPG, JPEG, or PNG file.": "请上传 JPG、JPEG 或 PNG 文件。",
      "File size must be less than 10MB.": "文件大小必须小于 10 MB。",
      "Remove": "移除"
    },
    ar: {
      "Submission Received": "تم استلام الطلب",
      "Application Received Successfully": "تم استلام طلبك بنجاح",
      "Thank you for completing your rental application. Your information has been received successfully and is currently pending review.": "شكرًا لك على إكمال طلب الإيجار. تم استلام معلوماتك بنجاح وهي الآن قيد المراجعة.",
      "Application ID:": "رقم الطلب:",
      "Email Confirmation": "تأكيد عبر البريد الإلكتروني",
      "A confirmation email will be sent shortly to the email address provided in your application. That email will confirm that your application has been received.": "سيتم إرسال رسالة تأكيد قريبًا إلى عنوان البريد الإلكتروني المذكور في طلبك، لتأكيد استلام الطلب.",
      "Secure & Verified Process": "عملية آمنة وموثقة",
      "This application process is handled directly by the property management team. All submitted applications are reviewed carefully, and payment confirmations are documented for transparency and record keeping.": "تتم إدارة عملية الطلب مباشرة من فريق إدارة العقار. تُراجع جميع الطلبات بعناية، وتُوثق تأكيدات الدفع لضمان الشفافية وحفظ السجلات.",
      "Fee Transparency": "شفافية الرسوم",
      "The application fee is refundable if your application is not approved or if you decide not to proceed after the tour. If approved and you choose to move forward, the fee is applied toward your first month's rent.": "رسوم الطلب قابلة للاسترداد إذا لم تتم الموافقة على طلبك أو إذا قررت عدم المتابعة بعد الجولة. وإذا تمت الموافقة واخترت المتابعة، فسيتم احتساب الرسوم ضمن إيجار الشهر الأول.",
      "Chime Payment Information": "معلومات الدفع عبر Chime",
      "Payment Method:": "طريقة الدفع:",
      "Account Name:": "اسم الحساب:",
      "Chime Tag / Username:": "وسم/اسم مستخدم Chime:",
      "Application Fee:": "رسوم الطلب:",
      "Reference Note:": "ملاحظة مرجعية:",
      "Provide a screenshot of the payment confirmation via email or text.": "يرجى إرسال لقطة شاشة لتأكيد الدفع عبر البريد الإلكتروني أو رسالة نصية.",
      "Payment should be sent only through the official Chime information provided on this page. Keep your payment confirmation for your records.": "يجب إرسال الدفع فقط عبر معلومات Chime الرسمية الواردة في هذه الصفحة. احتفظ بتأكيد الدفع ضمن سجلاتك.",
      "I have completed the application fee payment": "لقد أكملت دفع رسوم الطلب",
      "Continue To Payment Confirmation": "المتابعة إلى تأكيد الدفع",
      "Don't Have Chime?": "ليس لديك حساب Chime؟",
      "No problem. You can create a Chime account first, then return to complete the application fee payment using the official details above.": "لا مشكلة. يمكنك إنشاء حساب Chime أولًا، ثم العودة لإكمال دفع رسوم الطلب باستخدام البيانات الرسمية أعلاه.",
      "Download on the": "حمّل من",
      "Get it on": "متوفر على",
      "How to Set Up a Chime Account": "كيفية إنشاء حساب Chime",
      "Click the App Store or Google Play link above.": "اضغط على رابط App Store أو Google Play أعلاه.",
      "Download and install the Chime app.": "حمّل تطبيق Chime وثبّته.",
      "Open the app and choose to create a new account.": "افتح التطبيق واختر إنشاء حساب جديد.",
      "Enter your personal details and complete the signup process.": "أدخل بياناتك الشخصية وأكمل عملية التسجيل.",
      "Verify your identity if prompted by the app.": "تحقق من هويتك إذا طلب التطبيق ذلك.",
      "Once your account is ready, return to this page and use the payment details provided.": "بعد أن يصبح حسابك جاهزًا، عُد إلى هذه الصفحة واستخدم بيانات الدفع المقدمة.",
      "Need Help or Want to Verify?": "هل تحتاج إلى مساعدة أو ترغب في التحقق؟",
      "For any questions, clarification, or verification regarding the application process, you can contact Katherine directly using the information below.": "لأي أسئلة أو توضيحات أو للتحقق من عملية الطلب، يمكنك التواصل مباشرة مع Katherine باستخدام المعلومات أدناه.",
      "Email:": "البريد الإلكتروني:",
      "Phone:": "الهاتف:",
      "You can also review the main property management website for additional information.": "يمكنك أيضًا مراجعة الموقع الرئيسي لإدارة العقارات للحصول على معلومات إضافية.",
      "We support fair and equal housing practices for all applicants in accordance with applicable housing guidelines and nondiscrimination standards.": "ندعم ممارسات إسكان عادلة ومتكافئة لجميع المتقدمين وفقًا لإرشادات الإسكان المعمول بها ومعايير عدم التمييز.",
      "Upload Payment Confirmation": "رفع تأكيد الدفع",
      "Please upload your payment screenshot to complete your secure application verification.": "يرجى رفع لقطة شاشة الدفع لإكمال التحقق الآمن من طلبك.",
      "Applicant details": "بيانات المتقدم",
      "Full Name": "الاسم الكامل",
      "Email Address": "البريد الإلكتروني",
      "Application ID (optional)": "رقم الطلب (اختياري)",
      "Tap to upload": "اضغط للرفع",
      "or drag and drop your payment screenshot here.": "أو اسحب لقطة شاشة الدفع وأفلتها هنا.",
      "JPG, JPEG or PNG only": "JPG أو JPEG أو PNG فقط",
      "Selected File": "الملف المحدد",
      "Submit Payment Confirmation": "إرسال تأكيد الدفع",
      "Prefer Email Confirmation?": "تفضل التأكيد عبر البريد الإلكتروني؟",
      "If you would prefer to email your payment confirmation instead, send it directly to Katherine for processing.": "إذا كنت تفضل إرسال تأكيد الدفع عبر البريد الإلكتروني، فأرسله مباشرة إلى Katherine لمعالجته.",
      "Send Email Confirmation": "إرسال التأكيد عبر البريد الإلكتروني",
      "Payment Confirmation Submitted": "تم إرسال تأكيد الدفع",
      "Your payment screenshot has been received and is pending private verification. Katherine will review your confirmation with your application details.": "تم استلام لقطة شاشة الدفع وهي بانتظار التحقق الخاص. ستراجع Katherine التأكيد مع تفاصيل طلبك.",
      "Please select a payment screenshot before submitting.": "يرجى اختيار لقطة شاشة للدفع قبل الإرسال.",
      "Please upload a JPG, JPEG, or PNG file.": "يرجى رفع ملف بصيغة JPG أو JPEG أو PNG.",
      "File size must be less than 10MB.": "يجب أن يكون حجم الملف أقل من 10 ميغابايت.",
      "Remove": "إزالة"
    }
  };

  Object.keys(postFlowTranslations).forEach((language) => {
    Object.assign(translations[language], postFlowTranslations[language]);
  });

  const languageOptions = [
    { value: "en", label: "English", shortLabel: "EN", flag: "🇺🇸" },
    { value: "es", label: "Español", shortLabel: "ES", flag: "🇪🇸" },
    { value: "zh", label: "中文", shortLabel: "中文", flag: "🇨🇳" },
    { value: "fr", label: "Français", shortLabel: "FR", flag: "🇫🇷" },
    { value: "pt", label: "Português", shortLabel: "PT", flag: "🇵🇹" },
    { value: "ar", label: "العربية", shortLabel: "AR", flag: "🇸🇦" }
  ];

  const languageHomeFallbacks = {
    en: "index.html",
    es: "es.html",
    zh: "index.html?lang=zh",
    fr: "index.html?lang=fr",
    pt: "index.html?lang=pt",
    ar: "index.html?lang=ar"
  };

  function normalizeLanguage(language) {
    const value = String(language || "").toLowerCase().split("-")[0];
    return languageOptions.some((option) => option.value === value) ? value : "en";
  }

  function storedLanguage() {
    const params = new URLSearchParams(window.location.search);
    return normalizeLanguage(
      params.get("lang") ||
      window.sessionStorage.getItem("latestApplicationLanguage") ||
      window.localStorage.getItem("latestApplicationLanguage") ||
      window.localStorage.getItem("site-language") ||
      document.documentElement.lang ||
      defaultLanguage
    );
  }

  function languageHomeFallback() {
    return languageHomeFallbacks[storedLanguage()] || languageHomeFallbacks.en;
  }

  function resolveBackFallback(button) {
    const explicitFallback = button.dataset.fallbackHome;
    const languageHomePages = Object.values(languageHomeFallbacks);

    if (explicitFallback && !languageHomePages.includes(explicitFallback)) {
      return explicitFallback;
    }

    return languageHomeFallback();
  }

  function canonicalize(text) {
    const spanishGalleryDot = text.match(/^Ir a la imagen (\d{1,2})$/);

    if (spanishGalleryDot) {
      const n = Math.min(Math.max(parseInt(spanishGalleryDot[1], 10) || 1, 1), 15);
      return `Go to image ${n}`;
    }

    return aliases[text] || text;
  }

  function translateText(text, language) {
    const key = canonicalize(text);

    const galleryDot = key.match(/^Go to image (\d{1,2})$/);
    if (galleryDot && language !== "en") {
      const number = String(Math.min(Math.max(parseInt(galleryDot[1], 10) || 1, 1), 15));
      const labels = {
        es: `Ir a la imagen ${number}`,
        zh: `转到第 ${number} 张图片`,
        fr: `Aller à l'image ${number}`,
        pt: `Ir para a imagem ${number}`,
        ar: `انتقل إلى الصورة ${number}`
      };
      return labels[language] || key;
    }

    return language === "en" ? key : (translations[language] && translations[language][key]) || key;
  }

  function currentLanguage() {
    return document.documentElement.lang || defaultLanguage || "en";
  }

  function shouldSkipTextNode(node) {
    const parent = node.parentElement;
    return !parent || parent.closest("script, style, .language-select, .language-bar");
  }

  function translateTextNodes(language) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (shouldSkipTextNode(node) || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
      const original = node.nodeValue;
      const trimmed = original.trim();
      const key = node.parentElement.dataset.translationKey || canonicalize(trimmed);
      const hasTranslation = key !== trimmed || translations.es[key] || translations.zh[key] || translations.fr[key] || translations.pt[key] || translations.ar[key];

      if (!hasTranslation) {
        return;
      }

      node.parentElement.dataset.translationKey = key;
      node.nodeValue = original.replace(trimmed, translateText(key, language));
    });
  }

  function translateAttributes(language) {
    document.querySelectorAll("[placeholder], [aria-label]").forEach((element) => {
      ["placeholder", "aria-label"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) {
          return;
        }

        const current = element.getAttribute(attribute);
        const keyName = attribute === "placeholder" ? "placeholderKey" : "ariaLabelKey";
        const key = element.dataset[keyName] || canonicalize(current);
        const hasTranslation = key !== current || /^Go to image \d{1,2}$/.test(key) || translations.es[key] || translations.zh[key] || translations.fr[key] || translations.pt[key] || translations.ar[key];

        if (!hasTranslation) {
          return;
        }

        element.dataset[keyName] = key;
        element.setAttribute(attribute, translateText(key, language));
      });
    });
  }

  function validationMessageFor(field) {
    if (field.validity.valueMissing) {
      return field.type === "checkbox"
        ? translateText("Please check this box to continue.", currentLanguage())
        : translateText("Please complete this required field.", currentLanguage());
    }

    if (field.validity.typeMismatch && field.type === "email") {
      return translateText("Please enter a valid email address.", currentLanguage());
    }

    return "";
  }

  function setupLocalizedValidation() {
    document.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("invalid", () => {
        field.setCustomValidity(validationMessageFor(field));
      });

      field.addEventListener("input", () => {
        field.setCustomValidity("");
      });

      field.addEventListener("change", () => {
        field.setCustomValidity("");
      });
    });
  }

  function syncLanguageSelects(language) {
    languageSelects.forEach((select) => {
      Array.from(select.options).forEach((option, index) => {
        option.textContent = optionLabels[language][index];
      });
      select.value = language;
    });
  }

  function syncLanguageMenus(language) {
    document.querySelectorAll(".language-pill").forEach((button) => {
      const isActive = button.dataset.languageValue === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
      button.setAttribute("aria-selected", String(isActive));
    });
  }

  function enhanceLanguageSwitchers() {
    languageSwitchers.forEach((switcher, index) => {
      const select = switcher.querySelector(".language-select");
      if (!select || switcher.querySelector(".language-bar")) {
        return;
      }

      switcher.classList.add("is-enhanced");

      const bar = document.createElement("div");
      bar.className = "language-bar";
      bar.id = `language-bar-${index}`;
      bar.setAttribute("role", "listbox");
      bar.setAttribute("aria-label", select.getAttribute("aria-label") || "Select language");

      languageOptions.forEach((language) => {
        const button = document.createElement("button");
        button.className = "language-pill";
        button.type = "button";
        button.dataset.languageValue = language.value;
        button.setAttribute("role", "option");
        button.setAttribute("aria-label", language.label);
        button.innerHTML = `<span class="language-flag" aria-hidden="true">${language.flag}</span><span class="language-code">${language.shortLabel}</span>`;
        button.addEventListener("click", function () {
          applyLanguage(language.value);
        });
        bar.appendChild(button);
      });

      select.insertAdjacentElement("afterend", bar);
    });
  }

  function applyLanguage(language) {
    const supportedLanguage = translations[language] || language === "en" ? language : "en";
    document.documentElement.lang = supportedLanguage;
    document.documentElement.dir = supportedLanguage === "ar" ? "rtl" : "ltr";
    translateTextNodes(supportedLanguage);
    translateAttributes(supportedLanguage);
    syncLanguageSelects(supportedLanguage);
    syncLanguageMenus(supportedLanguage);
    document.querySelectorAll("input, select, textarea").forEach((field) => field.setCustomValidity(""));
    window.localStorage.setItem("site-language", supportedLanguage);
  }

  if (hamburger && nav) {
    const overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    overlay.setAttribute("aria-hidden", "true");
    nav.insertAdjacentElement("afterend", overlay);

    function closeNav() {
      nav.classList.remove("is-open");
      hamburger.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-lock");
    }

    function openNav() {
      nav.classList.add("is-open");
      hamburger.classList.add("is-open");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-lock");
    }

    hamburger.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeNav();
      }
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) {
        return;
      }

      const isClickInsideNav = nav.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);

      if (!isClickInsideNav && !isClickOnHamburger) {
        closeNav();
      }
    });

    overlay.addEventListener("click", closeNav);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        hamburger.focus();
      }
    });
  }

  function initCommunitySlider(slider) {
    const slides = Array.from(slider.querySelectorAll(".community-slide"));
    const dots = Array.from(slider.querySelectorAll(".community-dot"));
    const prev = slider.querySelector(".community-control-prev");
    const next = slider.querySelector(".community-control-next");
    const dotsTrack = slider.querySelector(".community-dots");
    let currentIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
    let timer = null;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchActive = false;
    let docVisible = !document.hidden;
    let inView = typeof IntersectionObserver === "undefined";
    const count = slides.length;
    const dotCount = Math.min(dots.length, count);

    if (!count) {
      return;
    }

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    function scrollDotIntoView(dotIndex) {
      if (!dotsTrack || dotIndex < 0 || dotIndex >= dotCount) {
        return;
      }

      const target = dots[dotIndex];
      target.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }

    function showSlide(index) {
      currentIndex = (index + count) % count;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      for (let d = 0; d < dotCount; d += 1) {
        const dot = dots[d];
        const isActive = d === currentIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      }

      scrollDotIntoView(currentIndex);
    }

    function stopAutoplay() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function maybeStartAutoplay() {
      stopAutoplay();
      if (!docVisible || !inView || prefersReducedMotion || touchActive || document.hidden) {
        return;
      }

      timer = window.setInterval(() => {
        showSlide(currentIndex + 1);
      }, 2850);
    }

    function goTo(index) {
      stopAutoplay();
      showSlide(index);
      maybeStartAutoplay();
    }

    document.addEventListener("visibilitychange", () => {
      docVisible = !document.hidden;
      if (!docVisible) {
        stopAutoplay();
      } else {
        maybeStartAutoplay();
      }
    });

    if ("IntersectionObserver" in window) {
      const viewportObserver = new IntersectionObserver(
        (entries) => {
          inView = entries.some((entry) => entry.isIntersecting);
          if (!inView) {
            stopAutoplay();
          } else {
            maybeStartAutoplay();
          }
        },
        { root: null, threshold: 0.14 }
      );
      viewportObserver.observe(slider);
    }

    if (prev) {
      prev.addEventListener("click", () => goTo(currentIndex - 1));
    }

    if (next) {
      next.addEventListener("click", () => goTo(currentIndex + 1));
    }

    for (let index = 0; index < dotCount; index += 1) {
      dots[index].addEventListener("click", () => goTo(index));
    }

    slider.addEventListener("mouseenter", () => stopAutoplay());
    slider.addEventListener("mouseleave", () => {
      touchActive = false;
      maybeStartAutoplay();
    });
    slider.addEventListener("focusin", () => stopAutoplay());
    slider.addEventListener("focusout", () => {
      maybeStartAutoplay();
    });

    slider.addEventListener(
      "touchstart",
      (event) => {
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchActive = true;
        stopAutoplay();
      },
      { passive: true }
    );

    slider.addEventListener(
      "touchend",
      (event) => {
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        touchActive = false;

        if (Math.abs(deltaX) < 36 || Math.abs(deltaX) < Math.abs(deltaY)) {
          maybeStartAutoplay();
          return;
        }

        goTo(currentIndex + (deltaX < 0 ? 1 : -1));
      },
      { passive: true }
    );

    showSlide(currentIndex);
    maybeStartAutoplay();
  }

  communitySliders.forEach(initCommunitySlider);

  backButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      if (window.history.length > 1) {
        window.history.back();
        return;
      }

      window.location.href = resolveBackFallback(button);
    });
  });

  languageSelects.forEach((select) => {
    select.addEventListener("change", function (event) {
      applyLanguage(event.target.value);
    });
  });

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }

  enhanceLanguageSwitchers();
  setupLocalizedValidation();
  applyLanguage(defaultLanguage);

  document.querySelectorAll(".accordion-item").forEach((item) => {
    item.addEventListener("toggle", function () {
      if (!item.open) {
        return;
      }

      const group = item.closest(".faq-accordion");
      if (!group) {
        return;
      }

      group.querySelectorAll(".accordion-item[open]").forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });

  function formatFieldLabel(name) {
    return name
      .replace(/^_/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }

  function generateApplicationId() {
    const now = new Date();
    const datePart = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("");
    const randomPart = String(Math.floor(100000 + Math.random() * 900000));

    return `APP-${datePart}-${randomPart}`;
  }

  function buildApplicationPayload(form, applicationId) {
    const formData = new FormData(form);
    const selectedLanguage = currentLanguage();
    formData.set("application-id", applicationId);
    formData.set("selected-language", selectedLanguage);

    const entries = [
      ["application-id", applicationId],
      ["selected-language", selectedLanguage],
      ...Array.from(formData.entries()).filter(([name]) => name !== "_subject" && name !== "application-id" && name !== "selected-language")
    ];
    const details = entries
      .map(([name, value]) => `${formatFieldLabel(name)}: ${value || "Not provided"}`)
      .join("\n");
    const get = (name) => formData.get(name) || "";

    return {
      formData,
      emailParams: {
        to_email: form.dataset.recipientEmail || "riordankatherine0@gmail.com",
        recipient_email: form.dataset.recipientEmail || "riordankatherine0@gmail.com",
        subject: "New Rental Application - Katherine Riordan",
        application_id: applicationId,
        applicationId,
        app_id: applicationId,
        selected_language: selectedLanguage,
        language: selectedLanguage,
        applicant_name: get("full-name"),
        name: get("full-name"),
        full_name: get("full-name"),
        applicant_email: get("email"),
        email: get("email"),
        phone: get("phone"),
        property: get("property"),
        move_date: get("move-date"),
        date_of_birth: get("dob"),
        current_address: get("current-address"),
        current_landlord: get("current-landlord"),
        residency_length: get("residency-length"),
        employer: get("employer"),
        job_title: get("job-title"),
        monthly_income: get("monthly-income"),
        employer_name: get("employer-name"),
        evicted: get("evicted"),
        occupants: get("occupants"),
        pets: get("pets"),
        notes: get("notes"),
        emergency_name: get("emergency-name"),
        emergency_phone: get("emergency-phone"),
        emergency_relationship: get("emergency-relationship"),
        agreement: get("agreement") ? "Certified as true and complete" : "Not certified",
        application_details: details,
        message: details
      }
    };
  }

  async function submitMainApplication(form, submitButton, statusMessage) {
    const endpoint = form.dataset.formspreeEndpoint;
    const serviceId = form.dataset.emailjsService;
    const templateId = form.dataset.emailjsTemplate;
    const publicKey = form.dataset.emailjsPublicKey;

    if (!endpoint || !serviceId || !templateId || !publicKey) {
      throw new Error("Application services are not available.");
    }

    if (!window.emailjs) {
      await loadEmailJsSdk();
    }

    window.emailjs.init({ publicKey });

    const applicationId = generateApplicationId();
    const selectedLanguage = currentLanguage();
    window.sessionStorage.setItem("latestApplicationId", applicationId);
    window.localStorage.setItem("latestApplicationId", applicationId);
    window.sessionStorage.setItem("latestApplicationLanguage", selectedLanguage);
    window.localStorage.setItem("latestApplicationLanguage", selectedLanguage);

    const { formData, emailParams } = buildApplicationPayload(form, applicationId);
    const formspreeRequest = fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Formspree submission failed.");
      }
      return response;
    });

    const emailRequest = window.emailjs.send(serviceId, templateId, emailParams);

    if (statusMessage) {
      statusMessage.textContent = translateText("Submitting securely...", currentLanguage());
      statusMessage.classList.remove("is-error", "is-success");
    }

    const results = await Promise.allSettled([formspreeRequest, emailRequest]);
    const successfulDeliveries = results.filter((result) => result.status === "fulfilled");

    if (successfulDeliveries.length === 0) {
      throw new Error("Application submission failed.");
    }

    if (statusMessage) {
      statusMessage.textContent = translateText("Application submitted. Redirecting...", currentLanguage());
      statusMessage.classList.add("is-success");
    }

    if (submitButton) {
      submitButton.textContent = translateText("Submitted. Redirecting...", currentLanguage());
    }

    window.setTimeout(() => {
      const confirmationPage = form.dataset.confirmation || "application-received.html";
      window.location.href = `${confirmationPage}?applicationId=${encodeURIComponent(applicationId)}&lang=${encodeURIComponent(selectedLanguage)}`;
    }, 900);
  }

  function loadEmailJsSdk() {
    return new Promise((resolve, reject) => {
      if (window.emailjs) {
        resolve(window.emailjs);
        return;
      }

      const existingScript = document.querySelector('script[src*="@emailjs/browser"]');
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(window.emailjs), { once: true });
        existingScript.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.async = true;
      script.onload = () => resolve(window.emailjs);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  if (applicationForm) {
    applicationForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (!applicationForm.checkValidity()) {
        applicationForm.reportValidity();
        return;
      }

      const submitButton = applicationForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton ? submitButton.textContent : "";
      const statusMessage = applicationForm.querySelector(".form-status");
      const usesApplicationServices = Boolean(applicationForm.dataset.formspreeEndpoint);

      if (submitButton && submitButton.disabled) {
        return;
      }

      if (!usesApplicationServices) {
        window.location.href = applicationForm.dataset.confirmation || "application-received.html";
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute("aria-busy", "true");
        submitButton.textContent = translateText("Submitting...", currentLanguage());
      }

      if (statusMessage) {
        statusMessage.textContent = translateText("Submitting securely...", currentLanguage());
        statusMessage.classList.remove("is-error", "is-success");
      }

      try {
        await submitMainApplication(applicationForm, submitButton, statusMessage);
      } catch (error) {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.removeAttribute("aria-busy");
          submitButton.textContent = originalButtonText || "Submit Application";
        }

        if (statusMessage) {
          statusMessage.textContent = translateText("Something went wrong. Please try again.", currentLanguage());
          statusMessage.classList.add("is-error");
          statusMessage.classList.remove("is-success");
        }
      }
    });
  }
})();
