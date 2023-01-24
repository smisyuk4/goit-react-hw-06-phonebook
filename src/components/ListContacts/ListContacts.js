import PropTypes from 'prop-types';
import { Filter } from 'components/Filter';
import { Contact } from 'components/Contact';
import { BaseContacts, CollectionContacts } from './ListContacts.styled';

export const ListContacts = ({
    arrayContacts  
}) => {
    return (
        <BaseContacts>
            <Filter/>

            {arrayContacts.length !== 0 && (
                <CollectionContacts>
                    {arrayContacts.map(item => (
                        <Contact
                            contact={item}
                            key={item.id}                           
                        />
                    ))}
                </CollectionContacts>
            )}
        </BaseContacts>
    );
};

ListContacts.propTypes = {
    arrayContacts: PropTypes.array.isRequired,
};
