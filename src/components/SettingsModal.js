import React from "react";
import {
    Modal,
    Button,
    Row,
    Col,
    DropdownButton,
    Dropdown
} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import{toggleSettingsModal,changeCategory,changeLanguage} from "../actions";
import{find} from "lodash";
import { LANGUAGES, MOVIES_CATEGORIES } from "../constants";
const SettingsModal = props => {
    //got state from store
    const show = useSelector(state => state.home.showSettings);
    const currentLanguage = useSelector(state => state.home.selectedLanguage);
    const currentDefaultCategory = useSelector(state => state.home.selectedCategory);
    const dispatch = useDispatch();
    
    //set functions
    const handleClose = () => dispatch(toggleSettingsModal(false))
    const onSelectedLanguage = selectedLanguage => 
    dispatch(
        changeLanguage(find(LANGUAGES,lang => lang.code === selectedLanguage))
    );
    const onSelectedCategory = selectedCategory =>
    dispatch(
        changeCategory(find(MOVIES_CATEGORIES,category => category.code === selectedCategory))
    );
    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Application Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mb-2">
                    <Col xs={4}>Language:</Col>
                    <Col xs={6}>
                        <DropdownButton
                        size="sm"
                        variant="secondary"
                        title={currentLanguage.name}
                        id="language-selector">
                            {Object.values(LANGUAGES).map(lang => (
                                <Dropdown.Item
                                eventKey={lang.code}
                                onSelect={onSelectedLanguage}
                                key={lang.code}
                                >
                                    {lang.name}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Col>
                </Row>
                <Row className="mb-2">
            <Col xs={4}>Default Category:</Col>
            <Col xs={6}>
              <DropdownButton
                size="sm"
                variant="secondary"
                title={currentDefaultCategory.name_en}
                id="category-selector"
              >
                {Object.values(MOVIES_CATEGORIES).map(cat => (
                  <Dropdown.Item
                    eventKey={cat.code}
                    onSelect={onSelectedCategory}
                    key={cat.code}
                  >
                    {cat.name_en}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
            </Modal.Body>
            <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
        </>
    );
};
export default SettingsModal;
